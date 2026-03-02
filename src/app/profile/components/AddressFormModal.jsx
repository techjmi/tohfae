/**
 * Address Form Modal
 * Modal for adding/editing addresses
 */

"use client";

import { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '@/shared/ui/modal';
import { Form } from '@/shared/ui/from';
import Button from '@/shared/ui/button/Button';
import { ADDRESS_TEXT } from '../address.constant';
import {
  ADDRESS_FORM_FIELDS,
  ADDRESS_GRID_FIELDS,
  INITIAL_ADDRESS_FORM_DATA,
  populateFormData
} from '../address.helper';

export default function AddressFormModal({ isOpen, onClose, onSave, initialData = null, isSaving = false }) {
  const [formData, setFormData] = useState(INITIAL_ADDRESS_FORM_DATA);
  const [errors, setErrors] = useState({});

  // Populate form when editing
  useEffect(() => {
    setFormData(populateFormData(initialData));
    setErrors({});
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      await onSave(formData);
    } catch (error) {
      // Handle backend validation errors
      if (error.errors) {
        setErrors(error.errors);
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalHeader onClose={onClose}>
        {initialData ? ADDRESS_TEXT.MODAL.EDIT_TITLE : ADDRESS_TEXT.MODAL.ADD_TITLE}
      </ModalHeader>

      <ModalBody>
        <Form
          fields={ADDRESS_FORM_FIELDS}
          gridFields={ADDRESS_GRID_FIELDS}
          formData={formData}
          errors={errors}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      </ModalBody>

      <ModalFooter>
        <Button
          type="button"
          onClick={onClose}
          variant="outline"
          color="neutral"
          disabled={isSaving}
        >
          {ADDRESS_TEXT.MODAL.CANCEL_BUTTON}
        </Button>
        <Button
          type="button"
          onClick={handleSubmit}
          variant="solid"
          color="primary"
          disabled={isSaving}
        >
          {isSaving ? ADDRESS_TEXT.MODAL.SAVING_BUTTON : ADDRESS_TEXT.MODAL.SAVE_BUTTON}
        </Button>
      </ModalFooter>
    </Modal>
  );
}

