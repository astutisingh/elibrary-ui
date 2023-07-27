import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Service } from 'src/app/service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-rental',
  templateUrl: './update-rental.component.html',
  styleUrls: ['./update-rental.component.css']
})
export class UpdateRentalComponent {
  
  rentToUpdate ={
    "status":'',
    "startDate":'',
    "endDate":'',
  };
  rentId: string;
  getRentalItems: any;
  selectedTeam: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: string, private servie:Service){
    console.log(data);
      this.rentId = data;
      this.getRentalById(this.rentId);
  }

  onSelected(value: string) {
    this.selectedTeam = value;
    console.log(this.selectedTeam);
    
  }


  getRentalById(rentId: string){

      this.servie.viewByRentalId(rentId).subscribe((data)=>{
        console.log(data);
        this.getRentalItems = data;
        this.rentToUpdate = {
          status: this.getRentalItems.status,
          startDate: this.getRentalItems.startDate,
          endDate: this.getRentalItems.endDate
        }
      })
  }

  confirmSave(updatedForm:any){
    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.updated(updatedForm);
        Swal.fire('Saved!', '', 'success')
        .then(() => {
          window.location.reload();
      })
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
      
    })
    window.location.reload;
  }

  updated(updatedForm:any) {
    this.rentToUpdate = {
      status:this.selectedTeam,
      startDate:updatedForm.value.startDate,
      endDate:updatedForm.value.endDate
    };

    this.servie.updateRental(this.getRentalItems.rentalId,this.rentToUpdate).subscribe((data)=>{
      console.log(data);
    })
  }







}
