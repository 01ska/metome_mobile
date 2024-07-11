import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Image, Modal, Button, TouchableOpacity } from "react-native";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { Picker } from "@react-native-picker/picker";
import { PDFDocument, PDFPage } from "react-native-pdf-lib";
import * as FileSystem from 'expo-file-system';
import getTransactions from "../services/transactionService";

import imgIncome from "../../icons/free-icon-replenishment-9452707.png";
import imgWithdrawal from "../../icons/free-icon-money-withdrawal-7969350.png";
import imgTransfer from "../../icons/free-icon-refill-3789118.png";
import imgPurchase from "../../icons/free-icon-checklist-4379544.png";
import imgECommerce from "../../icons/free-icon-card-payment-4748759.png";
import imgPayment from "../../icons/free-icon-card-payment-4748759.png";
import imgBonus from "../../icons/free-icon-bonus-3390953.png";
import imgOther from "../../icons/free-icon-menu-6059003.png";

const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  return format(date, "d MMMM yyyy 'г.' HH:mm", { locale: ru });
};

const TransfersScreen = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedType, setSelectedType] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const transactions = await getTransactions();
        const sortedTransactions = transactions.sort(
          (a, b) => new Date(b.createDateTime) - new Date(a.createDateTime)
        );

        setTransactions(sortedTransactions);
        setFilteredTransactions(sortedTransactions);
        setIsLoading(false);
      } catch (error) {
        console.error("Ошибка при получении данных: ", error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedType) {
      const filtered = transactions.filter(transaction => transaction.type === selectedType);
      setFilteredTransactions(filtered);
    } else {
      setFilteredTransactions(transactions);
    }
  }, [selectedType, transactions]);

  const formattedMoney = (money) => {
    if (money === "KZT") {
      return <>тг</>;
    } else if (money === "USD") {
      return <>$</>;
    } else if (money === "EUR") {
      return <>€</>;
    }
  };

  const downloadPDF = async () => {
    const page = PDFPage.create()
      .setMediaBox(200, 200)
      .drawText('Transaction Report', {
        x: 50,
        y: 180,
        fontSize: 15,
      });

    filteredTransactions.forEach((transaction, index) => {
      const y = 160 - index * 20;
      page.drawText(`${formatDate(transaction.createDateTime)} - ${transaction.amount.amount} ${transaction.amount.currency}`, {
        x: 20,
        y,
        fontSize: 10,
      });
    });

    const pdfPath = `${FileSystem.documentDirectory}transactions_report.pdf`;

    PDFDocument.create(pdfPath)
      .addPages(page)
      .write() // Returns a promise that resolves with the PDF's path
      .then(async path => {
        console.log('PDF created at: ' + path);
        alert('PDF создан и сохранен по пути: ' + path);
        await FileSystem.downloadAsync(path, FileSystem.documentDirectory + 'transactions_report.pdf');
      })
      .catch(error => {
        console.error('Ошибка при создании PDF: ', error);
      });
  };

  return (
    <View style={styles.container}>
      <Button title="Скачать PDF" onPress={downloadPDF} />
      <Button title="Фильтр по типу" onPress={() => setModalVisible(true)} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Выберите тип транзакции:</Text>
            <Picker
              selectedValue={selectedType}
              onValueChange={(itemValue) => setSelectedType(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Все типы" value="" />
              <Picker.Item label="Пополнение" value="INCOME" />
              <Picker.Item label="Снятие" value="WITHDRAWAL" />
              <Picker.Item label="Перевод" value="TRANSFER" />
              <Picker.Item label="Покупка" value="PURCHASE" />
              <Picker.Item label="Интернет покупка" value="E_COMMERCE" />
              <Picker.Item label="Платеж" value="PAYMENT" />
              <Picker.Item label="Бонус/кэшбек" value="BONUS" />
              <Picker.Item label="Прочие операции" value="OTHER" />
            </Picker>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.textStyle}>Закрыть</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <ScrollView
        style={styles.containerScroll}
        contentContainerStyle={styles.contentContainer}
      >
        <Text style={styles.headerText}>Выписка</Text>
        {isLoading ? (
          <Text>Загрузка...</Text>
        ) : (
          filteredTransactions.map((transaction) => (
            <View key={transaction.transactionId} style={styles.transaction}>
              <View style={styles.transactionDateIcon}>
                <Text style={styles.textDate}>
                  {formatDate(transaction.createDateTime)}
                </Text>

                <Image
                  source={
                    transaction.type === "INCOME"
                      ? imgIncome
                      : transaction.type === "WITHDRAWAL"
                      ? imgWithdrawal
                      : transaction.type === "TRANSFER"
                      ? imgTransfer
                      : transaction.type === "PURCHASE"
                      ? imgPurchase
                      : transaction.type === "E_COMMERCE"
                      ? imgECommerce
                      : transaction.type === "PAYMENT"
                      ? imgPayment
                      : transaction.type === "BONUS"
                      ? imgBonus
                      : imgOther
                  }
                  style={styles.icon}
                />
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: "Montserrat-Medium",
                      color: "#444",
                    }}
                  >
                    {transaction.creditDebitIndicator === "CREDIT"
                      ? "Оплата по кредиту"
                      : transaction.type === "INCOME" &&
                        transaction.creditDebitIndicator === "DEBIT"
                      ? "Пополнение"
                      : transaction.type === "WITHDRAWAL" &&
                        transaction.creditDebitIndicator === "DEBIT"
                      ? "Снятие"
                      : transaction.type === "TRANSFER" &&
                        transaction.creditDebitIndicator === "DEBIT"
                      ? "Перевод"
                      : transaction.type === "PURCHASE" &&
                        transaction.creditDebitIndicator === "DEBIT"
                      ? "Покупка"
                      : transaction.type === "E_COMMERCE" &&
                        transaction.creditDebitIndicator === "DEBIT"
                      ? "Интернет покупка"
                      : transaction.type === "PAYMENT" &&
                        transaction.creditDebitIndicator === "DEBIT"
                      ? "Платеж"
                      : transaction.type === "BONUS" &&
                        transaction.creditDebitIndicator === "DEBIT"
                      ? "Бонус/кэшбек"
                      : transaction.type === "OTHER" &&
                        transaction.creditDebitIndicator === "DEBIT"
                      ? "Прочие операции"
                      : null}
                  </Text>

                  <Text
                    style={[
                      transaction.status === "BOOKED"
                        ? styles.statusBooked
                        : transaction.status === "PENDING"
                        ? styles.statusPending
                        : null,
                    ]}
                  >
                    {transaction.status === "BOOKED"
                      ? "Завершен"
                      : transaction.status === "PENDING"
                      ? "В обработке"
                      : null}
                  </Text>
                </View>

                <View
                  style={{ alignItems: "flex-end", justifyContent: "flex-end" }}
                >
                  <Text style={styles.amount}>
                    -{transaction.amount.amount}{" "}
                    {formattedMoney(transaction.amount.currency)}
                  </Text>

                  <Text style={styles.chargeText}>
                    {transaction.chargeAmount.amount}{" "}
                    {formattedMoney(transaction.chargeAmount.currency)}
                  </Text>
                </View>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 10,
  },
  containerScroll: {
    flex: 1,
  },
  contentContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 20,
    fontFamily: "Montserrat-SemiBold",
  },
  transaction: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    width: "100%",
    gap: 15,
  },
  text: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  textDate: {
    fontFamily: "Montserrat-SemiBold",
    fontSize: 18,
  },
  icon: {
    width: 30,
    height: 30,
  },
  statusBooked: {
    color: "#42b883",
    fontFamily: "Montserrat-SemiBold",
  },
  statusPending: {
    color: "orange",
    fontFamily: "Montserrat-SemiBold",
  },
  transactionDateIcon: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  chargeText: {
    fontSize: 13,
    color: "#444",
    fontFamily: "Montserrat-SemiBold",
  },
  amount: {
    fontSize: 16,
    color: "#f96d00",
    fontFamily: "Montserrat-SemiBold",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 40,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    height: 340,
    justifyContent: 'space-between'
  },
  button: {
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 12
    // elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#ff7e67",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
  },
  modalText: {
    textAlign: "center",
    fontSize: 16,
    fontFamily: "Montserrat-SemiBold",
  },
  picker: {
    // height: 30,
    width: 250,

  },
});

export default TransfersScreen;