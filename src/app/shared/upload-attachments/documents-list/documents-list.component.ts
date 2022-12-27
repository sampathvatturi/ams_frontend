
import { ChangeDetectorRef, Component, ViewEncapsulation, ViewChild, TemplateRef, Input, OnInit } from '@angular/core';
import { AppsService } from 'src/app/shared/services/apps.service';
import { ThemeConstantService } from 'src/app/shared/services/theme-constant.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { DatePipe } from '@angular/common';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { UntypedFormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UploadAttachmentsComponent } from 'src/app/shared/upload-attachments/upload-attachments.component';
import { NzUploadFile } from "ng-zorro-antd/upload";

// import { Button, Modal, Space } from 'antd';

@Component({
  selector: 'app-documents-list',
  templateUrl: './documents-list.component.html',
  styleUrls: ['./documents-list.component.scss']
})
export class DocumentsListComponent implements OnInit {
  @Input() hndlr_tx;
  @Input() vndr_id;
  showLoading = false;
  usrAcsErrMsg: boolean;
  dcmnttypes: any;
  dcmnts: any;
  dscn_tx = null;
  prcs_id;
  dcmnt_type_nm;
  dcmnt_type_id;
  tmple_id;
  // @ViewChild('descriptionDialogTemp') descriptionDialogTemp: TemplateRef<any>;
  // @ViewChild('descriptionDialogUpload') descriptionDialogUpload: TemplateRef<any>;
  // @ViewChild('cnfrmDialog') cnfrmDialog: TemplateRef<any>;
  descriptionDialog;
  descriptionDialogUploadV;
  hms_loggedin_user_clients = [];
  clnt_nm;
  scndy_nm;
  regnrt;
  cnfrmDialogBox;
  scndy_dsply_nm;
  attachments = [];
  description;
  generatedcmnts: any;
  isVisible: boolean;
  isOkLoading: boolean;
  regeneratevisible: boolean = false;
  confirmvisible: boolean = false;
  uploadvisible: boolean = false;
  shwSpinner = false;
  constructor(private themeService: ThemeConstantService,
    public apiSrv: AppsService,
    private notification: NzNotificationService,
    private modalService: NzModalService,
    private datePipe: DatePipe,
    private fb: UntypedFormBuilder) {

    this.hms_loggedin_user_clients = JSON.parse(localStorage.getItem('clients'));
    this.clnt_nm = this.hms_loggedin_user_clients[0].clnt_nm;
    this.scndy_dsply_nm = this.hms_loggedin_user_clients[0].scndy_dsply_nm;
  }

  ngOnInit(): void {
    this.getDocumentTypes();
  }

  getDocumentTypes() {
    console.log(this.vndr_id)
    console.log(this.hndlr_tx)

    this.showLoading = true;
    const rte = 'documents/document/types/' + this.vndr_id + '/' + this.hndlr_tx
    this.apiSrv.get(rte).subscribe(res => {
      console.log("DOC LIST          ", res)
      this.showLoading = false;
      if (res['status'] == 404) {
        this.usrAcsErrMsg = true;
      } else if (res['status'] == 200) {
        if (res['data'] && res['data'].length) {
          this.dcmnts = res['data'];
        } else {
          this.dcmnts = {};
        }
        console.log(this.dcmnts, "bbbbbbbbbbbbbbbbbbbbbbbbbb")
      } var sno = 0;
      var counter1 = 0;
      this.dcmnts.filter((k) => {
        k['sno'] = sno + 1;
        sno++;
        k.prvs_dcmnts.filter((l) => {
          l['sno'] = ++counter1;
        });
      });
    })
  }


  generateDocument() {
    console.log(this.regnrt)
    this.regeneratevisible = false
    this.confirmvisible = true;

    if (this.regnrt == 0) {
      if (this.dscn_tx != null && this.dscn_tx != '') {
        this.confirmvisible = false;
        // this.descriptionDialog.close();
        this.showLoading = true;
        let data = {
          prcs_id: this.prcs_id,
          dcmnt_type_nm: this.dcmnt_type_nm,
          dcmnt_type_id: this.dcmnt_type_id,
          dscn_tx: this.dscn_tx,
          tmple_id: this.tmple_id,
          clnt_nm: this.clnt_nm,
          scndy_dsply_nm: this.scndy_dsply_nm,
          vndr_id: this.vndr_id,
        }
        const rte = 'documents/generate/document';

        this.apiSrv.create(data, rte).subscribe(res => {
          this.showLoading = false;
          if (res['status'] === 200) {
            this.showLoading = false;
            console.log(this.showLoading)
            this.getDocumentTypes();
            console.log(this.getDocumentTypes());
            this.dscn_tx = null;

            this.notification.create('success', '', res["message"]);

          }
          else {
            this.notification.create('error', '', res["message"]);
          }
        }, err => {
          this.showLoading = false;

          this.notification.create('error', '', 'Please Check your Internet Connection and Try Again');

        });
      } else {
        this.notification.create('success', '', 'Please Enter Description');
      }
    } else if (this.regnrt == 1) {
      if (this.dscn_tx != null && this.dscn_tx != '') {

        this.confirmvisible = false;
        this.showLoading = true;
        let data = {
          prcs_id: this.prcs_id,
          dcmnt_type_nm: this.dcmnt_type_nm,
          dcmnt_type_id: this.dcmnt_type_id,
          dscn_tx: this.dscn_tx,
          tmple_id: this.tmple_id,
          clnt_nm: this.clnt_nm,
          scndy_dsply_nm: this.scndy_dsply_nm,
          vndr_id: this.vndr_id,
        }
        const rte = 'documents/regenerate/document'

        this.apiSrv.create(data, rte).subscribe(res => {

          this.showLoading = false;
          if (res['status'] == 200) {
            this.getDocumentTypes();
            this.dscn_tx = null;
            this.notification.create('success', 'Document Generated Successfully', res["message"]);
          } else {
            this.notification.create('error', '', res["message"]);
          }
        }, err => {
          this.showLoading = false;
          this.notification.create('error', '', 'Please Check your Internet Connection and Try Again');
        });
      } else {
        this.notification.create('error', '', 'Please Enter Description');
      }
    }
  }
  openDscrptn(d, regnrt) {
    console.log(d);
    this.regnrt = regnrt;
    this.tmple_id = d.tmple_id;
    this.prcs_id = d.prcs_id;
    this.dcmnt_type_nm = d.dcmnt_type_nm;
    this.dcmnt_type_id = d.dcmnt_type_id;
    this.isVisible = true;
    if (this.regnrt == 1) {
      this.regeneratevisible = true;
      this.confirmvisible = false;
    } else if (this.regnrt == 0) {
      this.dscn_tx = null;
      this.confirmvisible = true;
      this.regeneratevisible = false;
    }
  }


  handleOk(): void {
    this.showLoading = true;
    this.isOkLoading = false;
    this.regeneratevisible = false;

  }

  handleCancel(): void {
    this.uploadvisible = false;
    this.confirmvisible = false;
    this.regeneratevisible = false;
  }

  shwDscrptn() {
    this.confirmvisible = true;
    this.regeneratevisible = false;
  }

  downloadPDF(url) {
    window.open(url);
  }

  openUploadDocuments(f): void {

    // this.uploadvisible =true;
    const modal = this.modalService.create({
      // nzTitle: 'Modal Title',
      nzContent: UploadAttachmentsComponent,
      nzComponentParams: {
        data: { multple_in: false },
      },
      nzFooter: []
    });
    // const dialogRef = this._matDialog.open(UploadAttachmentsComponent, {
    //   data: { multple_in: false },

    const instance = modal.getContentComponent();
    modal.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));

    modal.afterClose.subscribe((result) => {
      console.log('[afterClose] The result is:', result);
      if (result == undefined) {

        this.notification.create('error', '', 'Document Upload Failed');

      } else if (result && result.attachments.length == 0) {

        this.notification.create('error', '', 'Document Upload Failed');

      } else {

        if (f.dcmnt_id == null) {
          this.uploadNewDocument(f, result.attachments, result.description);
        } else {
          this.uploadSignedDocuments(f, result.attachments, result.description);
        }

        // console.log(f)
        // console.log(result)
      }
    });
  }


  uploadSignedDocuments(f, attachments, description) {
    this.shwSpinner = true;
    console.log(attachments)
    // this.tmple_id = f.tmple_id;
    // this.prcs_id = f.prcs_id;
    this.dcmnt_type_nm = f.dcmnt_type_nm;
    this.dcmnt_type_id = f.dcmnt_type_id;
    this.attachments = attachments;
    this.dscn_tx = description;
    if (f.sgn_upld_in == 1) {
      this.showLoading = true;
      let data = {
        dcmnt_id: f.dcmnt_id,
        attachments: attachments,
        dscn_tx: description,
      }

      const rte = 'documents/upload/generated/document';
      this.apiSrv.create(data, rte).subscribe(res => {
        this.shwSpinner = false;
        if (res['status'] == 200) {
          this.getDocumentTypes();
          this.dscn_tx = null;
          this.notification.create('success', '', 'Document Uploaded Successfully');

        } else {

          this.notification.create('error', '', res['message']);
        }
      }, err => {
        this.shwSpinner = false;

        this.notification.create('error', '', 'Please check your internet connection and try again');
      });
    } else {
      this.attachments = attachments;
      // this.descriptionDialogUploadV = this._matDialog.open(this.descriptionDialogUpload,{
      //   disableClose: true
      this.uploadvisible = true;

    }
  }


  uploadNewDocument(f, attachments, description) {
    this.shwSpinner = true;
    let data = {
      prcs_id: f.prcs_id,
      dcmnt_type_id: parseInt(f.dcmnt_type_id),
      vndr_id: this.vndr_id,
      dscn_tx: description,
      attachments: attachments
    }
    // console.log(data)

    const rte = 'documents/upload/document';
    this.apiSrv.create(data, rte).subscribe(res => {
      this.shwSpinner = false;
      if (res['status'] == 200) {
        this.getDocumentTypes();
        this.attachments = [];
        this.notification.create('success', '', 'Document Uploaded Successfully');
      } else {

        this.notification.create('error', '', res['message']);
      }

    }
      , err => {
        this.showLoading = false;

        this.notification.create('error', '', 'Please check your internet connection and try again');
      });
  }
  uploadDocument() {
    if (this.dscn_tx != null && this.dscn_tx != '') {
      // this.descriptionDialogUploadV.close();
      this.uploadvisible = false;

      this.showLoading = true;
      let data = {
        prcs_id: this.prcs_id,
        dcmnt_type_nm: this.dcmnt_type_nm,
        dcmnt_type_id: this.dcmnt_type_id,
        dscn_tx: this.dscn_tx,

        // scndy_dsply_nm: this.scndy_dsply_nm,
        attachments: this.attachments
      }

      const rte = 'documents/upload/generated/document';

      this.apiSrv.create(data, rte).subscribe(res => {

        this.showLoading = false;
        if (res['status'] == 200) {
          this.getDocumentTypes();
          this.dscn_tx = null;
          this.attachments = [];

          this.notification.create('success', '', 'Document Uploaded Successfully');
        } else {

          this.notification.create('error', '', res['message']);
        }

      }
        , err => {
          this.showLoading = false;

          this.notification.create('error', '', 'Please check your internet connection and try again');
        });
    } else {

      this.notification.create('error', '', 'Please enter description');
    }
  }

}