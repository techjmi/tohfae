/**
 * Address List Component
 * Displays all user addresses with add/edit/delete functionality
 */

"use client";

import { useState, useEffect } from 'react';
import Button from '@/shared/ui/button/Button';
import AddressCard from './AddressCard';
import AddressFormModal from './AddressFormModal';
import { ADDRESS_TEXT } from '../address.constant';
import { ADDRESS_LIST_STYLES } from '../address.style';
import {
  getMyAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress
} from '@/services/address/address.service';

export default function AddressList() {
  const [addresses, setAddresses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // Fetch addresses on mount
  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      setIsLoading(true);
      const data = await getMyAddresses();
      setAddresses(data);
    } catch (error) {
      console.error('Failed to fetch addresses:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddNew = () => {
    setEditingAddress(null);
    setIsModalOpen(true);
  };

  const handleEdit = (address) => {
    setEditingAddress(address);
    setIsModalOpen(true);
  };

  const handleSave = async (formData) => {
    try {
      setIsSaving(true);

      if (editingAddress) {
        // Update existing address
        const updatedAddresses = await updateAddress(editingAddress.addressId, formData);
        setAddresses(updatedAddresses);
      } else {
        // Add new address
        const updatedAddresses = await addAddress(formData);
        setAddresses(updatedAddresses);
      }

      setIsModalOpen(false);
      setEditingAddress(null);
    } catch (error) {
      console.error('Failed to save address:', error);
      // Re-throw error so modal can handle validation errors
      throw error;
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (addressId) => {
    if (!confirm(ADDRESS_TEXT.DELETE.MESSAGE)) {
      return;
    }

    try {
      const updatedAddresses = await deleteAddress(addressId);
      setAddresses(updatedAddresses);
    } catch (error) {
      console.error('Failed to delete address:', error);
      alert('Failed to delete address. Please try again.');
    }
  };

  const handleSetDefault = async (addressId) => {
    try {
      const updatedAddresses = await setDefaultAddress(addressId);
      setAddresses(updatedAddresses);
    } catch (error) {
      console.error('Failed to set default address:', error);
      alert('Failed to set default address. Please try again.');
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingAddress(null);
  };

  if (isLoading) {
    return (
      <div className={ADDRESS_LIST_STYLES.CONTAINER}>
        <div className={ADDRESS_LIST_STYLES.HEADER.CONTAINER}>
          <h3 className={ADDRESS_LIST_STYLES.HEADER.TITLE}>{ADDRESS_TEXT.SECTION.TITLE}</h3>
        </div>
        <div className={ADDRESS_LIST_STYLES.LOADING}>Loading addresses...</div>
      </div>
    );
  }

  return (
    <div className={ADDRESS_LIST_STYLES.CONTAINER}>
      <div className={ADDRESS_LIST_STYLES.HEADER.CONTAINER}>
        <h3 className={ADDRESS_LIST_STYLES.HEADER.TITLE}>{ADDRESS_TEXT.SECTION.TITLE}</h3>
        <Button
          onClick={handleAddNew}
          variant="solid"
          color="primary"
          size="sm"
        >
          {ADDRESS_TEXT.SECTION.ADD_BUTTON}
        </Button>
      </div>

      {addresses.length === 0 ? (
        <div className={ADDRESS_LIST_STYLES.EMPTY_STATE.CONTAINER}>
          <p className={ADDRESS_LIST_STYLES.EMPTY_STATE.TEXT}>{ADDRESS_TEXT.SECTION.NO_ADDRESS}</p>
          <Button
            onClick={handleAddNew}
            variant="solid"
            color="primary"
            size="md"
          >
            {ADDRESS_TEXT.SECTION.ADD_BUTTON}
          </Button>
        </div>
      ) : (
        <div className={ADDRESS_LIST_STYLES.GRID}>
          {addresses.map((address) => (
            <AddressCard
              key={address.addressId}
              address={address}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onSetDefault={handleSetDefault}
            />
          ))}
        </div>
      )}

      {/* Address Form Modal */}
      <AddressFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSave}
        initialData={editingAddress}
        isSaving={isSaving}
      />
    </div>
  );
}

