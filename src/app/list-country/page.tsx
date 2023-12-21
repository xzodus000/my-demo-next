"use client";
import React, { useEffect, useState } from "react";
import CardList from "../../../component/CardList";
import fetchDataCountries from "../../../service/service";
import getCountryData from "../../../service/countryService";
import { Select } from "antd";

const CardListPage = () => {
  const [countryFlags, setCountryFlags] = useState([]);
  const [myCountries, setMyCountries] = useState([]);
  const [code, setcode] = useState("EU");
  const { continent } = getCountryData(code);
  const countries = continent.countries;
  useEffect(() => {
    const fetchDataAndSetState = async () => {
      try {
        const data = await fetchDataCountries();
        setCountryFlags(data);
      } catch (error) {
        console.error("Error setting country flags state:", error);
      }
    };
    fetchDataAndSetState();
  }, [countries]);

  useEffect(() => {
    if (countryFlags && countries) {
      let arrayCoutries = [];

      for (let index = 0; index < countries.length; index++) {
        let element = countries[index];
        const flag = countryFlags.filter((item) => {
          return item?.code === element.code;
        });
        arrayCoutries.push({ ...element, imageFlag: flag[0].image });
      }

      setMyCountries(arrayCoutries);
    }
  }, [countries]);

  const onChange = (value: string) => {
    console.log(`selected ${value}`);
    setcode(value);
  };

  const onSearch = (value: string) => {
    console.log("search:", value);
  };

  // Filter `option.label` match the user type `input`
  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    <div>
      <h1>Card List Page</h1>
      <div>
        <Select
          showSearch
          placeholder="Select a person"
          optionFilterProp="children"
          onChange={onChange}
          value={code}
          onSearch={onSearch}
          filterOption={filterOption}
          options={[
            {
              value: "EU",
              label: "Europe",
            },
            {
              value: "SA",
              label: "South America",
            },
            {
              value: "AS",
              label: "Asia",
            },
            {
              value: "AF",
              label: "Africa",
            },
            {
              value: "AN",
              label: "Antarctica",
            },
            {
              value: "OC",
              label: "Oceania",
            },
            {
              value: "NA",
              label: "North America",
            },
          ]}
        />
      </div>
      <CardList data={myCountries} />
    </div>
  );
};

export default CardListPage;
