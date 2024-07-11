import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useUser } from "../../contexts/UserContext";
import axios from "axios";
import cardIcon from "../../icons/free-icon-card-payment-8221078.png"


const MyBalance = () => {
  const { userData } = useUser();

  const [balance, setBalance] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.stage.kisc.kz/v1/accounts/e2393065-5e36-4ffe-a81d-37ccfed7fb3a/balance",
          {
            headers: {
              Authorization:
                "Bearer eyJ4NXQjUzI1NiI6Img3RjhRR0ZnY1d3YngzaUJfQVIzT2V0Snczbmg2S2h5SW9RTWxtdXRVeVEiLCJraWQiOiJucGtfb2F1dGhfc3RhZ2UiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIwNDAxMTE1MDAwMzMiLCJhdWQiOiI5YTA4ZTc5MS0wZmFhLTQ4ODEtOTI3Zi0xMGY0MjA2ZjJlOGQiLCJuYmYiOjE3MTgzNjIxNzMsImF1dGhvcml6YXRpb25faWQiOiIzZjBiZjEyNC1iMDUzLTRlNjMtYWI4ZS1iNjUzYTliMzE0YzciLCJzY29wZSI6WyJvcGVuaWQiLCJhY2NvdW50X3RyYW5zYWN0aW9ucy40NmQ4YTk2NC1mMmMzLTQ1YmUtYmExYS1kNTJjYmU0ZWQxMGQiLCJhY2NvdW50cy40NmQ4YTk2NC1mMmMzLTQ1YmUtYmExYS1kNTJjYmU0ZWQxMGQiLCJhY2NvdW50X2JhbGFuY2UuNDZkOGE5NjQtZjJjMy00NWJlLWJhMWEtZDUyY2JlNGVkMTBkIl0sImlzcyI6Imh0dHBzOi8vYXV0aC5zdGFnZS5raXNjLmt6IiwiZXhwIjoxNzIwOTU0MTczLCJpYXQiOjE3MTgzNjIxNzMsInNpZCI6IjE3MjNmMWViLTkzYjEtNDJjNi1iZTQ0LTUwMmVjMTFkZTE3NCJ9.RWCOcW8iSDS35RJQphQHGzCJ2mdX-Suo9-WAXaW1ucVvIfObApPGXmPAye0iMIFtXnW79nn4QxWpvpzqVbCydRkVVtyHn6oTZJ7DO5fhn9Hq_h-NG0Dvca5F4I7uF0GX-9hP4P2SIpoDk9qg3GiUZgZWhiWvPtoZeSsWEkqjm21JnToFdap5IZmkTidRPSNFcq1M2HIBxQkHaOignErLidWGd2421A7vyvkPEsoOz1xgOuTW6qfdtVX9oG11p0pNXLnwAOUxG396aGR3Zho78CuiRa5izsPBm6lpKAJNRR7_az279hU9fl3Gwb3uwSVZftXzLWUROMmRNPAhjx5I8A",
              "x-fapi-interaction-id": "3df208f6-87b0-457c-a99e-f9c89fc8b747",
              "x-provider-id": "46d8a964-f2c3-45be-ba1a-d52cbe4ed10d",
              Accept: "application/json",
            },
          }
        );
        setBalance(response.data.data)
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
      return <>тг</>;
    } else if (money === "USD") {
      return <>$</>;
    } else if (money === "EUR") {
      return <>€</>;
    }
  };

  return (
      <View style={styles.cardInfo}>
        <Image source={cardIcon} style={styles.cardIcon}/>
        <View style={{gap: 10}}>
          <View style={styles.cardInfoMainBalance}>
            <Text style={styles.cardInfoTextAvailable}>Доступно</Text>
            <Text style={{color: '#42b883', fontFamily: 'Montserrat-SemiBold', letterSpacing: 1}}>{balance.availableBalance} {formattedMoney(balance.currency)}</Text>
          </View>

          <View style={styles.cardInfoMainBalance}>
            <Text style={styles.cardInfoText}>В блоке</Text>
            <Text style={{color: '#ff7e67', fontFamily: 'Montserrat-SemiBold', letterSpacing: 1}}>{balance.blockedBalance} {formattedMoney(balance.currency)}</Text>
          </View>

          <View style={styles.cardInfoMainBalance}>
            <Text style={styles.cardInfoText}>Баланс</Text>
            <Text style={{color: '#f8b400', fontFamily: 'Montserrat-SemiBold', letterSpacing: 1}}>{balance.currentBalance} {formattedMoney(balance.currency)}</Text>
          </View>
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  cardIcon: {
    width: 36,
    height: 36
  },
  cardInfo: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
    padding: 20,
    borderRadius: 12,
    backgroundColor: '#fff',
    marginTop: 20
  },
  cardInfoText: {
    fontSize: 16,
    fontFamily: 'Montserrat-Medium',
  },
  cardInfoTextAvailable: {
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
  },
  cardInfoMainBalance: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 20,
    alignItems: 'center',
    width: '90%',
  },
});

export default MyBalance;
