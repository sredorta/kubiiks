import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'kii-newsletter-form',
  templateUrl: './kii-newsletter-form.component.html',
  styleUrls: ['./kii-newsletter-form.component.scss']
})
export class KiiNewsletterFormComponent implements OnInit {
  public myForm : FormGroup;
  constructor() { }

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
  }

  onSubmit(value:any) {
    console.log("Submitting:",value);
    if (this.myForm.valid) {
      console.log("VALID FORM!");
    }
  }
}
