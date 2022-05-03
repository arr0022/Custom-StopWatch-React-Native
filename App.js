/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import moment from 'moment';
import {useCallback} from 'react';
// import { } from 'react-native';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedProps,
} from 'react-native-reanimated';
import {useDerivedValue} from 'react-native-reanimated';
import {ReText} from 'react-native-redash';

import Svg, {Circle} from 'react-native-svg';

const BACKGROUND_COLOR = '#444B6F';
const BACKGROUND_STROKE_COLOR = '#303858';
const STROKE_COLOR = '#A6E1FA';

const {width, height} = Dimensions.get('window');

const CIRCLE_LENGTH = 500; // 2PI*R
const R = CIRCLE_LENGTH / (2 * Math.PI);

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const App = () => {
  // const [defaultTime, setDefaultTime] = useState(new moment());
  const [interval, setinterval] = useState('');
  const [duration, setDuration] = useState(10 * 1);
  // const [timer, setTimer] = useState(false);
  // const [home, setHome] = useState(duration);

  useEffect(() => {
    // console.log(timer);
    // console.log();
    // var x =
    setinterval(
      new Date(duration * 1000).toUTCString().match(/(\d\d:\d\d:\d\d)/)[0],
    );
    // console.log({test: });
    // setinterval();
  }, []);

  // useEffect(() => {
  //   // if (interval !== '' && timer && interval >= 1) {
  //   //   // console.log('enter',moment?.duration(defaultTime?.diff(interval))?.as('seconds'));
  //   //   if (moment?.duration(defaultTime?.diff(interval))?.as('seconds') <= 0) {
  //   //     setTimer(false);
  //   //     setHome(duration);
  //   //   } else {
  //   //     setTimeout(() => {
  //   //       setinterval(new moment(interval).add(1, 's'));
  //   //       // setHome(parseInt(duration - moment.duration(defaultTime?.diff(interval)).as('seconds')));
  //   //     }, 1000);
  //   //   }
  //   // }

  // }, []);

  // console.log(
  //   // interval !== ''
  //   //   ? moment.duration(interval?.diff(defaultTime)).as('seconds')
  //   //   : 'not update',
  //   {interval, home, duration}
  //   // interval >= 1,
  // );

  const progress = useSharedValue(0);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: CIRCLE_LENGTH * (1 - progress.value),
  }));

  const progressText = useCallback(() => {
    return interval !== '' ? interval : '00:00';
  }, [interval]);

  const onPress = useCallback(() => {
    // setTimer(true);
    progress.value = withTiming(progress.value > 0 ? 0 : 1, {
      duration: duration * 1000,
    });
    // if (timer) {
    // for (let i = duration; i > 1; i--) {
    //   console.log('enter',i);

    // }
    // }
    let value = duration;
    setInterval(() => {
      if (value > 0) {
        value = value - 1
        setinterval(
          new Date(value * 1000).toUTCString().match(/(\d\d:\d\d:\d\d)/)[0],
        );
      }
      // else if(value < 1 && value <= duration) {
      //   value = value + 1
      //   setinterval(
      //     new Date(value * 1000).toUTCString().match(/(\d\d:\d\d:\d\d)/)[0],
      //   );
      // }
    }, 1000);
  }, []);

  // console.log({interval, timer});

  return (
    <View style={styles.container}>
      <Text style={styles.progressText}>{progressText()}</Text>
      <Svg style={{position: 'absolute'}}>
        <Circle
          cx={width / 2}
          cy={height / 2}
          r={R}
          stroke={BACKGROUND_STROKE_COLOR}
          strokeWidth={10}
        />
        <AnimatedCircle
          cx={width / 2}
          cy={height / 2}
          r={R}
          stroke={STROKE_COLOR}
          strokeWidth={5}
          strokeDasharray={CIRCLE_LENGTH}
          animatedProps={animatedProps}
          strokeLinecap={'round'}
        />
      </Svg>
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <Text style={styles.buttonText}>Run</Text>
      </TouchableOpacity>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressText: {
    fontSize: 30,
    color: 'rgba(256,256,256,0.7)',
    width: 200,
    textAlign: 'center',
  },
  button: {
    position: 'absolute',
    bottom: 80,
    width: width * 0.7,
    height: 60,
    backgroundColor: BACKGROUND_STROKE_COLOR,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 25,
    color: 'white',
    letterSpacing: 2.0,
  },
});
