package com.learning.Model;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;


@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaymentInfo {

    private String cardHolderName;
    private String cardNumber;
    private LocalDate expiryDate;
    private String cvv;
}
