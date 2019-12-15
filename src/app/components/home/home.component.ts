import {Component} from '@angular/core';
import { PETS } from '../../model/pets'; 
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
    

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  
  list = PETS;
  closeResult: string;
  pet: any;
  idInput: number;

  constructor(private modalService: NgbModal) {
    this.clean();
  }
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openModal(update, id) {
    this.getInfoPet(id); 
    this.modalService.open(update, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openModalDetail(detail, id) {
    this.getInfoPet(id); 
    this.modalService.open(detail, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }


  clean() {
    this.pet = {id:0,name:'',age:0,race:''};
  }
  
  getMaxIndex() {
    var max = 0;
    for (var pet of this.list){
      if(pet.id > max) {
        max = pet.id
      }
    }
    this.idInput = max
    console.log("idInput : " + this.idInput);
  }
  
  savePet() {
    this.getMaxIndex();
    this.pet.id = this.idInput + 1;
    var petNew = this.pet;
    this.list.push(petNew);  
    this.clean();      
    this.modalService.dismissAll();                
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  
  deletePetLocal(id: number ){ 
    console.log("delete.." + id);
    this.list.splice(id, 1); 
  }

  getInfoPet(index: number) {
    this.getData(this.list[index]);
  }

  getData(pet) {
    this.pet.id = pet.id;
    this.pet.name = pet.name;
    this.pet.age = pet.age;
    this.pet.race = pet.race; 
  }

  updatePetLocal() {
    for (let e of this.list){
      if(e.id == this.pet.id){
        e.id = this.pet.id;
        e.name = this.pet.name;
        e.age = this.pet.age;
        e.race = this.pet.race;
      }
    } 
    this.clean();      
    this.modalService.dismissAll();
  }
  
}