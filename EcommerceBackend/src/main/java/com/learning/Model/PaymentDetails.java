package com.learning.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaymentDetails {
    private String paymentMethod;
    private String status;
    private String paymentId;
    private String paymentDateAndTime;
    private String amountPaid;
}
