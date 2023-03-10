import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/shared/common/notification.service';
import { InventoryItemsService } from 'src/app/shared/moduleservices/inventory-items.service';
import { UomService } from 'src/app/shared/moduleservices/uom.service';



@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {

  visible = false;
  submit = true;
  drawerTitle: string = '';
  inventoryForm!: UntypedFormGroup;
  inventory_info: any = [];
  user_data: any = [];
  searchText = '';
  updateId: any;
  uomData: any [] = [];
  updateBtnDisable:boolean = true;
  isLoading : boolean = true ;
  dataMessage = '';
  isDisabled:boolean = false;

  
  constructor(
    private fb: UntypedFormBuilder,
    private inventoryService: InventoryItemsService,
    private notificationService: NotificationService,
    private uomService: UomService,
    ) {}

  ngOnInit(): void {
    this.inventoryFormValidators();    
    this.user_data = sessionStorage.getItem('user_data');
    this.user_data = JSON.parse(this.user_data);
    this.getInventoryItems();
    this.getUoms();
  }

  onToolbarPreparing(e:any) {
    e.toolbarOptions.items.unshift({
      location: 'after',
      widget: 'dxButton',
      options: {
        icon: 'plus',
        text: 'Add Inventory',
        onClick: this.create.bind(this, 'new'),
        bindingOptions: {
          'disabled': 'isEmailButtonDisabled'
        }
      }
    });
  }

  permissions = { "slct_in": 1, "insrt_in": 1, "updt_in": 1, "dlte_in": 1, "exprt_in": 1 };

  columnDefs = [
    { headerName: 'S.No.', field: 'sno', alignment: 'center', filter: false,width:'100'},
    { headerName: 'Item Name', alignment: 'left', field: 'item_name',width:'175'},
    { headerName: 'UOM', alignment: 'left', field: 'uom_id',width:'175' },
    { headerName: 'Price', alignment: 'left', field: 'price',},
    { headerName: 'Tax', alignment: 'left', field: 'tax',width:'175' },
  ];

  getInventoryItems(): void {
    this.isLoading = true;
    this.inventoryService.getInventoryItems().subscribe((res) => {
        this.inventory_info = res;
        if(res !='' && res.length >=1){
          this.isLoading = false ;
        this.inventory_info.forEach((elem:any,index:any)=>{
          elem['sno']=index+1;
        })
       }else{
        this.isLoading = false ;
        this.dataMessage = res.message
      }
    });
  }

  getUoms(): void {
    this.uomService.getUoms().subscribe((res) => {
      this.uomData = res;
   });
  }

  create(): void {
    this.submit = true;
    this.drawerTitle = 'Add Inventory Item';
    this.visible = true;
    this.inventoryFormValidators();
  }

  prepareCreatePayload(data: any) {
    const payload = {
      item_name: data.item_name,
      uom_id: data.uom_id,
      price: data.price,
      tax: data.tax,
      created_by: this.user_data?.user_id,
      updated_by: this.user_data?.user_id
    }
    return payload;
  }

  onSubmit() {
    if (this.inventoryForm.valid){      
      this.inventoryService.createInventoryItem(this.prepareCreatePayload(this.inventoryForm.value)).subscribe((res) => {
        this.visible = false;
        this.getInventoryItems();
        this.notificationService.createNotification('success', res?.message);
      });
    }
    else {      
      Object.values(this.inventoryForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }    
  }

  edit(type:any,data: any) {
    this.submit = false;
    this.visible = true;
    if (type == 'edit'){
      this.isDisabled = false;
      this.drawerTitle = 'Edit Invetory Details';
      this.updateId = data?.item_id;
      this.inventoryFormValidators();
      this.inventoryForm.get('item_id')?.setValue(data.item_id);
      this.inventoryForm.get('item_name')?.setValue(data.item_name);
      this.inventoryForm.get('uom_id')?.setValue(data.uom_id);
      this.inventoryForm.get('price')?.setValue(data.price);
      this.inventoryForm.get('tax')?.setValue(data.tax);
      this.updateBtnDisable = true;
    }
    
    if (type === 'view'){
      this.isDisabled = true;
      this.updateBtnDisable = false;
      this.drawerTitle = 'View Inventory Details';
      this.inventoryFormValidators();
      this.inventoryForm.get('item_id')?.setValue(data.item_id);
      this.inventoryForm.get('item_name')?.setValue(data.item_name);
      this.inventoryForm.get('uom_id')?.setValue(data.uom_id);
      this.inventoryForm.get('price')?.setValue(data.price);
      this.inventoryForm.get('tax')?.setValue(data.tax);
    }
  }

  prepareUpdatePayload(data: any) {
    const payload = {
      item_name: data.item_name,
      uom_id: data.uom_id,
      price: data.price,
      tax: data.tax,
      updated_by: this.user_data?.user_id
    }
    return payload;
  }

  onUpdate() {
    if (this.inventoryForm.valid){
      this.inventoryService.updateInventoryItem(this.updateId,this.prepareUpdatePayload(this.inventoryForm.value)).subscribe(
        (res) => {
          this.visible = false;
          this.getInventoryItems();
          this.notificationService.createNotification('success', res?.message);
        }
      )
    } else {      
      Object.values(this.inventoryForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  close(): void {
    this.visible = false;
    this.updateBtnDisable = true;
  }

  inventoryFormValidators() {
    this.inventoryForm = this.fb.group({
      item_id: [''],
      item_name: [{value:'',disabled:this.isDisabled}, [Validators.required,Validators.minLength(3),Validators.maxLength(50)]],
      uom_id: [{value:'',disabled:this.isDisabled}, [Validators.required]],
      price: [{value:'',disabled:this.isDisabled}, [Validators.required]],
      tax: [{value:'',disabled:this.isDisabled}, [Validators.required]]
    });
  }

}
