import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Intern } from 'src/app/model/interns';
import { InternService } from 'src/app/services/intern.service';

@Component({
  selector: 'app-intern',
  templateUrl: './intern.component.html',
  styleUrls: ['./intern.component.scss']
})
export class InternComponent implements OnInit {

  interns: Intern[]=[];
  filterInterns: Intern[]=[];

  constructor(private router: Router, private service: InternService) { }

  ngOnInit(): void {
    this.service.getInterns().subscribe((intern) =>{
      this.interns = intern;
      this.filterInterns = intern;
    })
  }

  editIntern(intern: any){
    this.router.navigate(['/add-intern'], {
      queryParams: {IdIntern: intern.id}
    })
  }

  deleteIntern(id: string){
    this.service.deleteIntern(id).subscribe((response) => {
      this.interns = this.interns.filter((intern) => intern.id != id);
      this.filterInterns = [...this.interns];
    });
  }

  newIntern(): void{
    this.router.navigate(['/add-intern']);
  }

  ascending(){
    this.filterInterns = this.filterInterns.sort((a,b) => a.name.localeCompare(b.name));
  }

  descending(){
    this.filterInterns = this.filterInterns.sort((a,b) => b.name.localeCompare(a.name));
  }



}
