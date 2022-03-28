import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { Intern } from 'src/app/model/interns';
import { InternService } from 'src/app/services/intern.service';
import { Guid } from 'typescript-guid';


@Component({
  selector: 'app-add-intern',
  templateUrl: './add-intern.component.html',
  styleUrls: ['./add-intern.component.scss']
})
export class AddInternComponent implements OnInit {

  internId: string = '';
  isOnEdit: boolean = true;

  internsForm: FormGroup = new FormGroup({
    name: new FormControl(),
    age: new FormControl(),
    dateOfBirth: new FormControl()
  });

  constructor(
    private route: ActivatedRoute, 
    private formBuilder: FormBuilder,
    private service: InternService
  ) { }

  

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      (param) => {
        this.internId = param['IdIntern'];
        if(this.internId) {
          this.isOnEdit = true;
        }
        else {
          this.isOnEdit = false;
        }
      }
    );
    this.pageType();
  }

  pageType() {
    if (this.isOnEdit) {
      this.service
        .getInterns()
        .pipe(
         map((interns) => interns.filter((intern)=> intern.id == this.internId)[0])
        )
        .subscribe((i) => this.detailIntern(i));
    } else {
      this.detailIntern({
        id: Guid.create().toString(),
        name: '',
        age: '',
        dateOfBirth: ''
      });
    }
  }

  addIntern(){
    const intern: Intern = {
      id: this.internsForm.get("id")?.value,
      name: this.internsForm.get("name")?.value,
      age: this.internsForm.get("age")?.value,
      dateOfBirth: this.internsForm.get("dateOfBirth")?.value
    }

    if(this.isOnEdit) {
      this.service.editIntern(intern);
    }
    else{
      this.service.addIntern(intern);
    }
  }

  detailIntern(intern: Intern) {
    this.internsForm = this.formBuilder.group(
      {
          id: intern.id,
          name: [intern.name, Validators.required],
          age: [intern.age, Validators.required],
          dateOfBirth: [intern.dateOfBirth, Validators.required]
      }
    );
  }

  public get nameValid() {
    return this.internsForm.get('name');
  }

  public get ageValid() {
    return this.internsForm.get('age');
  }

  public get dateOfBirthValid() {
    return this.internsForm.get('dateOfBirth');
  }

}
