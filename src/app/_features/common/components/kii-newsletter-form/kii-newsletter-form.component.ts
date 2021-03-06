import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { KiiFormRestoreService } from '../../services/kii-form-restore.service';
import { KiiApiNewsletterService, INewsletter } from '../../services/kii-api-newsletter.service';

@Component({
  selector: 'kii-newsletter-form',
  templateUrl: './kii-newsletter-form.component.html',
  styleUrls: ['./kii-newsletter-form.component.scss']
})
export class KiiNewsletterFormComponent implements OnInit {
  public myForm : FormGroup;
  @Output() onKiiSubmit = new EventEmitter<INewsletter>();

  constructor( private kiiForm : KiiFormRestoreService) { }

  ngOnInit() {
    this.createForm();
  }

  /**Creates the form corresponding with the sharedSettings into account */
  createForm() {
      this.myForm =  new FormGroup({    
        firstName : new FormControl('', Validators.compose([
          Validators.required,
          Validators.minLength(2)
        ])),
        lastName : new FormControl('', Validators.compose([
          Validators.required,
          Validators.minLength(2)
        ])),      
        email: new FormControl('', Validators.compose([
                Validators.required,
                Validators.email,
                Validators.minLength(5)
        ])),
      });
      //Restoring
      const restored = this.kiiForm.restore("newsletter");
      if (restored) {
        for (let [key, value] of Object.entries(restored)) {
          console.log("RESTORING FORM",key,value);
          if (this.myForm.controls[key]) this.myForm.controls[key].patchValue(value);
        }
      }
  }

  onSubmit(value:any) {
    if (this.myForm.valid) {
      this.onKiiSubmit.emit(value);
    }
  }

  saveForm() {
     this.kiiForm.store('newsletter',this.myForm.value);
  }
}
