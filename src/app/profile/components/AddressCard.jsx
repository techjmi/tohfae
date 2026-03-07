/**
 * Address Card Component
 * Displays a single address with actions
 */

"use client";

import { Card, CardBody } from '@/shared/ui/card';
import Button from '@/shared/ui/button/Button';
import { Badge } from '@/shared/ui/badge';
import { ADDRESS_TEXT } from '../address.constant';
import { ADDRESS_CARD_STYLES } from '../address.style';

export default function AddressCard({ address, onEdit, onDelete, onSetDefault }) {
  return (
    <Card variant="outline" className={ADDRESS_CARD_STYLES.CARD}>
      <CardBody>
        <div className={ADDRESS_CARD_STYLES.HEADER.CONTAINER}>
          <div className={ADDRESS_CARD_STYLES.HEADER.LABEL_CONTAINER}>
            <h4 className={ADDRESS_CARD_STYLES.HEADER.LABEL}>{address.label}</h4>
            {address.isDefault && (
              <Badge color="success" variant="solid" size="sm">
                {ADDRESS_TEXT.CARD.DEFAULT_BADGE}
              </Badge>
            )}
          </div>
        </div>

        <div className={ADDRESS_CARD_STYLES.CONTENT.CONTAINER}>
          <p className={ADDRESS_CARD_STYLES.CONTENT.NAME}>{address.fullName}</p>
          <p>{address.phone}</p>
          <p>{address.addressLine1}</p>
          {address.addressLine2 && <p>{address.addressLine2}</p>}
          <p>
            {address.city}, {address.state} - {address.pincode}
          </p>
          <p>{address.country}</p>
        </div>

        <div className={ADDRESS_CARD_STYLES.ACTIONS.CONTAINER}>
          <Button
            onClick={() => onEdit(address)}
            variant="outline"
            color="primary"
            size="sm"
          >
            {ADDRESS_TEXT.CARD.EDIT_BUTTON}
          </Button>

          {!address.isDefault && (
            <Button
              onClick={() => onSetDefault(address.addressId)}
              variant="outline"
              color="neutral"
              size="sm"
            >
              {ADDRESS_TEXT.CARD.SET_DEFAULT_BUTTON}
            </Button>
          )}

          <Button
            onClick={() => onDelete(address.addressId)}
            variant="outline"
            color="danger"
            size="sm"
          >
            {ADDRESS_TEXT.CARD.DELETE_BUTTON}
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}

