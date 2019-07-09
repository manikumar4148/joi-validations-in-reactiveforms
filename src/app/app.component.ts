import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { IMyDpOptions } from 'mydatepicker';
import * as moment from 'moment';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  studentform:FormGroup;
  b:any;
  arr:any=[];
  data:any;
  datechanged:string="";
  public myDatePickerOptions: IMyDpOptions={
    dateFormat: 'yyyy-mm-dd',
    disableSince: {year: new Date().getFullYear(),
      month: new Date().getMonth()+1,
      day: new Date().getDate()
    },
    disableDays: [{year: 2019, month: 7, day: 6}]
  };
   
    
  // public myForm:FormGroup

 
 
constructor(private formbuilder:FormBuilder, private http:HttpClient){

}
  ngOnInit(){
   this.studentform=this.formbuilder.group({
     fname:['',[Validators.required,Validators.minLength(4)]],
     lname:['',[Validators.required,Validators.minLength(4)]],
     email:['',[Validators.required,Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
    
     gender:['',[Validators.required]],
     phone:['',[Validators.required,Validators.minLength(10)]],
     address:['',[Validators.required]],
     selectc:['',Validators.required],
     selectb:['',Validators.required],
     dob:[ '',Validators.required]

     
   }) 
  
  }
  setDate():void{
    let date=new Date();
    console.log(date);
    this.studentform.patchValue({dob:{
      date:{
        year: date.getFullYear(),
            month: date.getMonth(),
            day: date.getDate()}
           
    }})

  }
  
//   clearDate(): void {
    
//     this.studentform.patchValue({dob: null});
// }
  submit(a){
    // this.b=a.value;
    // console.log(this.b);
    this.arr.push(this.studentform.value);
      // console.log(this.arr);
      this.http.post('http://localhost:4201/api/studentdata', a)
  .subscribe((res) => {
        this.data = res;
    console.log(this.data);
    
  }, error => {
    console.log(error);
  });
      alert("registration successfully done");
    }

    
    



}
