import { Component, Input, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'upload-attachments',
  templateUrl: './upload-attachments.component.html',
  styleUrls: ['./upload-attachments.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UploadAttachmentsComponent implements OnInit {
  @Input() data;
  imageUrl;
  attachments = [];
  fl_nm;
  fl_type;
  dscn_tx = null;

  shwUpld = true;
  constructor(private router: Router,
    private notification: NzNotificationService,
    private modal: NzModalRef
  ) {
  }
  ngOnInit() {
    console.log(this.data)
  }
  Close(): void {
    this.attachments = [];
    this.modal.destroy(this.attachments);
  }
  handleInputChange(e) {
    let files = e.dataTransfer ? e.dataTransfer.files : e.target.files;
    for (var i = 0; i < files.length; i++) {
      if (files[i].type == 'application/msword' || files[i].type == 'application/vnd.ms-excel' || files[i].type == 'image/jpeg' || files[i].type == 'image/png' || files[i].type == 'image/jpg' || files[i].type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || files[i].type == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || files[i].type == 'application/pdf') {
        let file = files[i];
        this.fl_type = file.type;
        this.fl_nm = file.name;
        let reader = new FileReader();
        reader.onload = this._handleReaderLoaded.bind(this);
        reader.readAsDataURL(file);
      }
      else {
        this.notification.create('error', '', "Please Upload Valid File");
      }

    }
  }

  _handleReaderLoaded(e) {
    var reader = e.target;
    this.attachments.push({ fl_type: this.fl_type, fl_name: this.fl_nm, base64: reader.result });
    if (this.data.multple_in == false) {
      if (this.attachments.length == 1) {
        this.shwUpld = false;
      } else {
        this.shwUpld = true;
      }
    } else {
      this.shwUpld = true;
    }
  }

  removeImg(val) {
    const idx = this.attachments.indexOf(val);
    if (idx !== -1) {
      this.attachments.splice(idx, 1);
    }
    if (this.data.multple_in == false) {
      if (this.attachments.length == 1) {
        this.shwUpld = false;
      } else {
        this.shwUpld = true;
      }
    } else {
      this.shwUpld = true;
    }
  }

  upload() {
    this.modal.destroy({attachments:this.attachments,description:this.dscn_tx});
  }

}
