import React, { useState } from "react";
import {
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const taxilogo = require("@/assets/images/taxi.png");

export default function Taxical() {
  const [distance, setDistance] = useState("");
  const [timetraffic, setTimeTraffic] = useState("");

  const [totalPrice, setTotalPrice] = useState(0);
  const [distancePrice, setDistancePrice] = useState(0);
  const [trafficPrice, setTrafficPrice] = useState(0);

  const handlecaltaxipay = () => {
    Keyboard.dismiss();

    const dist = parseFloat(distance);
    const time = parseFloat(timetraffic);

    if (isNaN(dist) || isNaN(time)) {
      return;
    }

    let t_cost = time * 3.0;
    let d_cost = 0;

    if (dist <= 1) {
      d_cost = 0;
    } else if (dist <= 10) {
      // กม. 2-10 (9 กม.) @ 6.5 บาท
      d_cost = (dist - 1) * 6.5;
    } else if (dist <= 20) {
      // กม. 10-20 (10 กม.) @ 7.0 บาท
      d_cost = 9 * 6.5 + (dist - 10) * 7.0;
    } else if (dist <= 40) {
      // กม. 20-40 (20 กม.) @ 8.0 บาท
      d_cost = 9 * 6.5 + 10 * 7.0 + (dist - 20) * 8.0;
    } else if (dist <= 60) {
      // กม. 40-60 (20 กม.) @ 8.5 บาท
      d_cost = 9 * 6.5 + 10 * 7.0 + 20 * 8.0 + (dist - 40) * 8.5;
    } else if (dist <= 80) {
      // กม. 60-80 (20 กม.) @ 9.0 บาท
      d_cost = 9 * 6.5 + 10 * 7.0 + 20 * 8.0 + 20 * 8.5 + (dist - 60) * 9.0;
    } else {
      // เกิน 80 กม. ขึ้นไป @ 10.5 บาท
      d_cost =
        9 * 6.5 +
        10 * 7.0 +
        20 * 8.0 +
        20 * 8.5 +
        20 * 9.0 +
        (dist - 80) * 10.5;
    }

    // รวมค่าโดยสารทั้งหมด (35 บาทเริ่มต้น + ค่าระยะทางส่วนเกิน + ค่ารถติด)
    let total = 35 + d_cost + t_cost;

    // ปัดเศษให้เป็นจำนวนเต็ม
    const final = Math.ceil(total);

    setTotalPrice(final);
    setDistancePrice(Math.ceil(35 + d_cost));
    setTrafficPrice(Math.ceil(t_cost));
  };

  const resetPress = () => {
    Keyboard.dismiss();
    setDistance("");
    setTimeTraffic("");
    setTotalPrice(0);
    setDistancePrice(0);
    setTrafficPrice(0);
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.contianer}>
        <Image source={taxilogo} style={styles.taxilogo} />
        <Text style={styles.fontcal}>คำนวณค่าแท็กซี่ </Text>
        <View style={styles.cardInput}>
          <Text style={styles.distanceinput}>ระยะทาง (กิโลเมตร)</Text>
          <TextInput
            placeholder="0.0"
            keyboardType="numeric"
            value={distance}
            onChangeText={setDistance}
            style={styles.textinput}
          />
          <View style={{ height: 20 }} />
          <Text style={styles.labelinput}>เวลารถติด (นาที)</Text>
          <TextInput
            placeholder="0"
            keyboardType="numeric"
            value={timetraffic}
            onChangeText={setTimeTraffic}
            style={styles.textinput}
          />
          <View style={styles.siprowbtn}>
            <TouchableOpacity
              style={styles.btncalculate}
              onPress={handlecaltaxipay}
            >
              <Text style={styles.textbtn}>คำนวณค่าโดยสาร</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btsreset} onPress={resetPress}>
              <Text
                style={{
                  color: "#FF5252",
                  fontFamily: "Kanit_700Bold",
                  fontSize: 16,
                }}
              >
                รีเซ็ตค่า
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* Result Card */}
        <View style={styles.cardResult}>
          <Text style={styles.resultTitle}>ค่าโดยสารโดยประมาณ</Text>
          <Text style={styles.resultBigPrice}>
            {totalPrice.toFixed(2)} <Text style={{ fontSize: 20 }}>บาท</Text>
          </Text>

          <View style={styles.divider} />

          <View style={styles.rowDetail}>
            <Text style={styles.detailText}>ค่าโดยสารตามระยะทาง</Text>
            <Text style={styles.detailText}>{distancePrice.toFixed(2)} ฿</Text>
          </View>
          <View style={styles.rowDetail}>
            <Text style={styles.detailText}>
              ค่ารถติด ({timetraffic || 0} นาที)
            </Text>
            <Text style={styles.detailText}>{trafficPrice.toFixed(2)} ฿</Text>
          </View>
        </View>
        <View
          style={{
            padding: 20,
            marginTop: 20,
            alignItems: "center",
            borderRadius: 10,
          }}
        >
          <Text style={styles.appnameen}>ID : 6652410025</Text>
          <Text style={styles.appnameth}>NAME : ชัยสิทธิ์ เพิ่มผล</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  appnameen: {
    fontFamily: "kanit_400Regular",
    fontSize: 16,
    color: "#80898d",
  },
  appnameth: {
    fontFamily: "kanit_400Regular",
    fontSize: 16,
    color: "#80898d",
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "#636e72",
    marginVertical: 10,
  },
  resultBigPrice: {
    color: "#F5C857",
    fontFamily: "Kanit_700Bold",
    fontSize: 48,
    marginVertical: 10,
  },
  resultTitle: {
    color: "#B2BEC3",
    fontFamily: "Kanit_400Regular",
    fontSize: 14,
  },
  rowDetail: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  detailText: {
    color: "#DFE6E9",
    fontFamily: "Kanit_400Regular",
    fontSize: 14,
  },
  fontcal: {
    fontFamily: "Kanit_700Bold",
    fontSize: 24,
    color: "#F5C857",
    marginBottom: 20,
  },
  labelinput: {
    fontFamily: "Kanit_700Bold",
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  siprowbtn: {
    flexDirection: "row",
    gap: 10,
    marginTop: 20,
  },
  btncalculate: {
    flex: 4,
    backgroundColor: "#007E6E",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  btsreset: {
    flex: 2,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#FF5252",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  textbtn: { color: "white", fontSize: 18, fontFamily: "Kanit_700Bold" },
  cardResult: {
    width: "85%",
    backgroundColor: "#2D3436",
    borderRadius: 20,
    padding: 20,
    marginTop: 20,
    alignItems: "center",
  },
  textinput: {
    backgroundColor: "#F5F6F8",
    padding: 12,
    borderRadius: 10,
    fontSize: 16,
    fontFamily: "Kanit_400Regular",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  distanceinput: {
    fontFamily: "Kanit_700Bold",
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  resultText: {
    fontSize: 20,
    marginTop: 10,
    color: "#DEDED1",
    fontFamily: "Kanit_700Bold",
  },
  cardInput: {
    width: "85%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  taxilogo: {
    width: 120,
    height: 120,
    marginBottom: 10,
    resizeMode: "contain",
  },
  contianer: {
    flex: 1,
    backgroundColor: "#F2F2F2",
    alignItems: "center",
    justifyContent: "center",
  },
});
