/*Singnal 1st Signal should be on the core angular import*/
data = signal<number | string> (10);
updatesignal(){
  this.data.set("Hello");
}
<h1>{{data()}}</h1>
<button (click)="updatesignal()">Click</button>

/*operation 2nd */
x=10;
y=20;
z= this.x + this.y;
check(){-
  this.z= 100;
}
<h1>{{z}}</h1>
<button (click)="check()">Click</button>

/*operation 3rd effect should be on the core angular import*/

username= signal('Karmick');
count = signal(0);
displayName= false;

constructor(){
  effect(()=>{
    if(this.count()==3){
        this.displayName=true;
    }else{
      this.displayName=false;
    }
  }) 
}

ToggleValue(){
  this.count.set(this.count()+1);
}
<h1>{{count()}}</h1>
<button (click)="ToggleValue()">Click</button>
@if(displayName){
<div class="box">{{displayName}}</div>
}

/*operation 4th*/
people = ['jack', ' Adam'];

@for(user of people; track user; let i = $index){
  @if($first || $last){
    <h1 style="color: red;">Count {{i+1}} for all {{people}}</h1>
  }@else{
    <h1>Count {{i+1}} for all {{people}}</h1>
  }
  @if($odd){
   <h1 style="color: blue;">Count {{i}} for all {{people}}</h1>
  }@if($even){
   <h1 style="color: purple;">Count {{i}} for all {{people}}</h1>
  }
}

/*operation 5th*/
import { Component, signal, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
imports: [RouterOutlet,FormsModule],
  
name = "";
<input [(ngModel)]="name" placeholder="Type Here" type="text" />
<h4>{{name}}</h4>

/*operation 5th*/

task = ""
taskList: {id: number, task:string }[] = []

addTask(){
  this.taskList.push({id: this.taskList.length + 1,  task:this.task})
  this.task = "";  
}
del(taskId: Number){
  alert('Are You Sure? You want to Delete?')
  this.taskList=this.taskList.filter((item)=>item.id!=taskId);
}
<input [(ngModel)]="task" placeholder="Type Here" type="text" />
<button (click)="addTask()">Add Item</button>

@for(task of taskList; track task.id){
  <ul>
      <li>{{task.id}}</li>
      <li>{{task.task}}</li>      
      <li><button type="button" (click)="del(task.id)">Delete</button></li>
  </ul>
}



  

