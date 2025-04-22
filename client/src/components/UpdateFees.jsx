
import React, { useState } from "react";
import { Button, Modal, Spinner } from "flowbite-react";
import { HiExclamation, HiCheck } from "react-icons/hi";
import { useSelector } from "react-redux";

export default function UpdateFees() {
  const { currentUser } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [resultModal, setResultModal] = useState({
    show: false,
    success: false,
    message: ""
  });

  const handleUpdateFees = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/fee/update-fees", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      
      if (response.ok) {
        setResultModal({
          show: true,
          success: true,
          message: data.message || "Fees updated successfully!"
        });
      } else {
        setResultModal({
          show: true,
          success: false,
          message: data.message || "Failed to update fees."
        });
      }
    } catch (error) {
      console.error("Error updating fees:", error);
      setResultModal({
        show: true,
        success: false,
        message: "An unexpected error occurred while updating fees."
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button 
        onClick={() => setShowConfirmModal(true)} 
        className="w-full"
        gradientDuoTone="purpleToBlue"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Spinner size="sm" className="mr-2" />
            Updating...
          </>
        ) : (
          "Update All Student Fees"
        )}
      </Button>

      {/* Confirmation Modal */}
      <Modal
        show={showConfirmModal}
        size="md"
        popup
        onClose={() => setShowConfirmModal(false)}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiExclamation className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to update fees for all students?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={() => {
                  setShowConfirmModal(false);
                  handleUpdateFees();
                }}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Spinner size="sm" className="mr-2" />
                ) : null}
                Yes, Update All
              </Button>
              <Button
                color="gray"
                onClick={() => setShowConfirmModal(false)}
                disabled={isLoading}
              >
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* Result Modal */}
      <Modal
        show={resultModal.show}
        size="md"
        popup
        onClose={() => setResultModal({ ...resultModal, show: false })}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            {resultModal.success ? (
              <HiCheck className="mx-auto mb-4 h-14 w-14 text-green-500" />
            ) : (
              <HiExclamation className="mx-auto mb-4 h-14 w-14 text-red-500" />
            )}
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              {resultModal.message}
            </h3>
            <div className="flex justify-center">
              <Button
                color={resultModal.success ? "success" : "failure"}
                onClick={() => setResultModal({ ...resultModal, show: false })}
              >
                Close
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}