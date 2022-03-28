import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  internForm!: FormGroup;

  constructor(
    private route: ActivatedRoute, 
    private formBuilder: FormBuilder,
    private service: InternService
  ) { }

  
  public get nameValid() {
    return this.internForm.get('name');
  }

  public get ageValid() {
    return this.internForm.get('age');
  }

  public get dateOfBirthValid() {
    return this.internForm.get('dateOfBirth');
  }


  ngOnInit(): void {
    this.route.queryParams.subscribe(
      (param) => {
        this.internId = param['IdIntern'];
        if(this.isOnEdit) {
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
        .subscribe((newIntern) => this.detailIntern(newIntern));
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
      id: this.internForm.get("id")?.value,
      name: this.internForm.get("name")?.value,
      age: this.internForm.get("age")?.value,
      dateOfBirth: this.internForm.get("dateOfBirth")?.value
    }

    if(this.isOnEdit) {
      this.service.editIntern(intern);
    }
    else if(!this.isOnEdit){
      this.service.addIntern(intern);
    }
  }

  detailIntern(intern: Intern) {
    this.internForm = this.formBuilder.group(
      {
          id: intern.id,
          name: [intern.name, Validators.required],
          age: [intern.age, Validators.required],
          dateOfBirth: [intern.dateOfBirth, Validators.required]
      }
    );
  }

}
