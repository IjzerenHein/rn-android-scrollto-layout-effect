import { useLayoutEffect, useRef, useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';

const ROW_HEIGHT = 50;
const TARGET_ROW = 1000;
const TARGET_Y = TARGET_ROW * ROW_HEIGHT;

export default function App() {
  const scrollRef = useRef<ScrollView>(null);
  const [rowCount, setRowCount] = useState(5);
  const [offset, setOffset] = useState(0);

  // Grow the content and scroll in the same commit, from a layout effect.
  useLayoutEffect(() => {
    if (rowCount > 5) {
      scrollRef.current?.scrollTo({ y: TARGET_Y, animated: false });
    }
  }, [rowCount]);

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <Button
          title={`Grow to 2000 rows and scroll to row ${TARGET_ROW}`}
          onPress={() => setRowCount(2000)}
        />
        <Button
          title="Control: scrollTo the same offset now"
          onPress={() =>
            scrollRef.current?.scrollTo({ y: TARGET_Y, animated: false })
          }
        />
        <Text testID="offset">
          contentOffset.y = {offset} (expected {TARGET_Y})
        </Text>
      </View>
      <ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
        onScroll={e => setOffset(Math.round(e.nativeEvent.contentOffset.y))}
      >
        {Array.from({ length: rowCount }, (_, i) => (
          <View key={i} style={styles.row}>
            <Text>Row {i}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, paddingTop: 48 },
  header: { padding: 12, gap: 8 },
  row: {
    height: ROW_HEIGHT,
    justifyContent: 'center',
    paddingHorizontal: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
