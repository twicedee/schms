import React from "react";
import { Button } from "flowbite-react";


export default function UpdateFees() {

    const handleUpdateFees = async () => {
        try {
          const response = await fetch("/api/fee/update-fees", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(),

          });
    
          const data = await response.json();
          if (response.ok) {
            alert("Fees updated successfully!");
          } else {
            alert(`Error: ${data.message}`);
          }
        } catch (error) {
          console.error("Error updating fees:", error);
          alert("Failed to update fees.");
        }
      };
    
  return (
    <Button onClick={handleUpdateFees} className="full-w">Update All Student Fees</Button>
    
  )
}




