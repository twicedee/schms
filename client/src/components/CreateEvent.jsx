import React from "react";
import { Modal, TextInput, Button, Select } from "flowbite-react";

export default function CreateEvent() {
  const [openModal, setOpenModal] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email) {
      return setError("Please enter an email");
    }
    try {
      setLoading(true);
      const res = await fetch("/api/auth/send-invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
        console.log(data.message);
      }

      if (res.ok) {
        setOpenModal(false);
        setError(null);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
        <Button onClick={() => setOpenModal(true)} className="w-full">
            Create Event
        </Button>
      <Modal
      show={openModal}
      size="5xl"
      popup
      onClose={() => setOpenModal(false)}
      >
        <Modal.Header>
          
        </Modal.Header>
        <div className="p-5">


        </div>
        
      </Modal>
    </>
  );
}
