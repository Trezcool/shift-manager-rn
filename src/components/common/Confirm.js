import React from 'react';
import { Modal, Text, View } from 'react-native';

import { Button } from './Button';
import { Card } from './Card';
import { CardSection } from './CardSection';

const Confirm = ({ visible, children, onAccept, onDecline }) => {
  return (
    <Modal
      visible={visible}
      animationType={"slide"}
      transparent
      onRequestClose={() => {}}
    >
      <View style={styles.container}>
        <Card>
          <CardSection style={styles.cardSection}>
            <Text style={styles.text}>{children}</Text>
          </CardSection>

          <CardSection>
            <Button title={"No"} onPress={onDecline} style={{flex: 1}} />
            <Button
              title={"Yes"}
              onPress={onAccept}
              style={{flex: 1, backgroundColor: 'transparent'}}
              titleStyle={{color: '#2980B9'}}
            />
          </CardSection>
        </Card>
      </View>
    </Modal>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'rgba(214, 219, 223, 0.85)',
    justifyContent: 'center',
    position: 'relative',
  },
  cardSection: {
    justifyContent: 'center',
  },
  text: {
    flex: 1,
    fontSize: 18,
    textAlign: 'center',
  }
};

export { Confirm };
