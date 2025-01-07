import { Button, Modal, Alert, TextInput } from "flowbite-react";
import React, { useState } from "react";

export default function SignUpInvite() {
  const [openModal, setOpenModal] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({ email: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email) {
      return setError('Please enter an email');
    }
    try {
      setLoading(true);
      const res = await fetch('/api/auth/send-invite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
        Send Invite Link
      </Button>

      <Modal
        show={openModal}
        size="5xl"
        popup
        onClose={() => setOpenModal(false)}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <div className="flex justify-center text-xl">
              <h3 className="font-medium text-gray-900 dark:text-white">
                Send Invite Link
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {error && <Alert color="failure">{error}</Alert>}
              <TextInput
                type="email"
                id="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <Button
                type="submit"
                gradientDuoTone="purpleToBlue"
                outline
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Invite"}
              </Button>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
