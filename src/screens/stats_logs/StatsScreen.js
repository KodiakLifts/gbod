import React, { Component } from "react";
import { View } from "react-native";
import SubScreenTemplate from "../templates/SubScreenTemplate";
import ListCard from "../../components/cards/ListCard";
import GraphItem from "../../components/cards/GraphItem";

class Stats extends Component {
  render() {
    const graphs = [
      <ListCard key={0} headerTitle="" items={[<GraphItem key={0} />]} />
    ];
    return (
      <SubScreenTemplate headerContent={<View />} scrollContent={graphs} />
    );
  }
}

export default Stats;
