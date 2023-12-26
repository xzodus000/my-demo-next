import { useQuery, gql } from "@apollo/client";
import client from "../config/apolloClient";

interface Country {
  capital: string;
  code: string;
  emojiU: string;
  emoji: string;
  currency: string;
}

interface Continent {
  code: string;
  name: string;
  countries: Country[];
}

interface GetCountryDataResult {
  continent: Continent;
}

const getCountryData = (filter: string): GetCountryDataResult => {
  const GET_COUNTRY_DATA = gql`
    query GetCountry {
      continent(code: "${filter}") {
        code
        name
        countries {
          capital
          code
          emojiU
          emoji
          currency
          name
          languages{
            name
          }
        }
      }
    }
  `;
  const { loading, error, data } = useQuery(GET_COUNTRY_DATA, { client });

  if (loading) return { continent: { code: "", name: "", countries: [] } };
  if (error) return { continent: { code: "", name: "", countries: [] } };

  return data;
};

export default getCountryData;
