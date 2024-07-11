import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { PieChart } from "react-native-chart-kit";
import getTransactions from "../services/transactionService";
import { Dimensions } from "react-native";

function MyAnalytic() {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const screenWidth = Dimensions.get("window").width;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const transactions = await getTransactions();

        setTransactions(transactions);
        setIsLoading(false);
      } catch (error) {
        console.error("Ошибка при получении данных: ", error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const formattedMoney = (money) => {
    if (money === "KZT") {
      return "тг";
    } else if (money === "USD") {
      return "$";
    } else if (money === "EUR") {
      return "€";
    }
  };

  const totalAmountsByType = transactions.reduce((totals, transaction) => {
    const { amount, type } = transaction;
    const { currency, amount: value } = amount;
    if (!totals[type]) {
      totals[type] = {};
    }
    if (!totals[type][currency]) {
      totals[type][currency] = 0;
    }
    totals[type][currency] += value;
    return totals;
  }, {});

  const formatNumber = (number) => {
    return number.toLocaleString("ru-RU");
  };

  const pieChartData = Object.keys(totalAmountsByType).map((type, index) => {
    const totalAmount = Object.values(totalAmountsByType[type]).reduce(
      (sum, value) => sum + value,
      0
    );
    return {
      name:
        type === "INCOME"
          ? "Пополнение"
          : type === "WITHDRAWAL"
          ? "Снятие"
          : type === "TRANSFER"
          ? "Перевод"
          : type === "PURCHASE"
          ? "Покупка"
          : type === "E_COMMERCE"
          ? "Интернет покупка"
          : type === "PAYMENT"
          ? "Платеж"
          : type === "BONUS"
          ? "Бонус/кэшбек"
          : type === "OTHER"
          ? "Прочие операции"
          : "Неизвестно",
      amount: totalAmount,
      color: `hsl(${index * 30}, 70%, 50%)`,
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    };
  });

  return (
    <ScrollView style={styles.cardInfo}>
      <Text style={styles.headerText}>Аналитика покупок</Text>
      {isLoading ? (
        <Text>Загрузка...</Text>
      ) : (
        <View>
          <PieChart
            data={pieChartData}
            width={screenWidth}
            height={200}
            chartConfig={{
              backgroundColor: "#1cc910",
              backgroundGradientFrom: "#eff3ff",
              backgroundGradientTo: "#efefef",
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            accessor="amount"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />
          {Object.keys(totalAmountsByType).map((type) => (
            <View key={type} style={styles.typeSection}>
              <Text style={styles.typeHeader}>
                {type === "INCOME"
                  ? "Пополнение"
                  : type === "WITHDRAWAL"
                  ? "Снятие"
                  : type === "TRANSFER"
                  ? "Перевод"
                  : type === "PURCHASE"
                  ? "Покупка"
                  : type === "E_COMMERCE"
                  ? "Интернет покупка"
                  : type === "PAYMENT"
                  ? "Платеж"
                  : type === "BONUS"
                  ? "Бонус/кэшбек"
                  : type === "OTHER"
                  ? "Прочие операции"
                  : "Неизвестно"}
              </Text>
              {Object.keys(totalAmountsByType[type]).map((currency) => (
                <Text key={currency} style={styles.totalText}>
                  ({currency}): {formatNumber(totalAmountsByType[type][currency])}{" "}
                  {formattedMoney(currency)}
                </Text>
              ))}
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  cardInfo: {
    display: "flex",
    gap: 20,
    padding: 20,
    borderRadius: 12,
    backgroundColor: "#fff",
    marginTop: 20,
  },
  typeSection: {
    marginTop: 10,
  },
  typeHeader: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  totalText: {
    fontSize: 16,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default MyAnalytic;
