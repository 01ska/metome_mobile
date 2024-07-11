import axios from "axios";

const getTransactions = async () => {
  try {
    const response = await axios.get(
      "https://api.stage.kisc.kz/v1/accounts/e2393065-5e36-4ffe-a81d-37ccfed7fb3a/transactions",
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
    return response.data.data.transactions;
  } catch (error) {
    console.error("Ошибка при получении данных: ", error);
    throw error;
  }
};

export default getTransactions;