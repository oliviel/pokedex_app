import React, { PureComponent } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import Loading from '../../components/Loading/Loading';
import PokeHeader from './PokeHeader';
import PokeBox from './PokeBox';
import PokeStats from './PokeStats';
import PokeEvoluction from './PokeEvoluction';

import { pokemonDetailFetch } from '../../store/actions/detail-action';

class Detail extends PureComponent {

  static navigationOptions = ({ navigation }) => {
    const pokemon = navigation.getParam('pokemon', { name: '', code: 0 });
    return {
      title: `#${pokemon.code} ${pokemon.name}`,
      headerTitleStyle: {
        textAlign: "center",
        flex: 1
      }
    };
  };

  componentDidMount() {
    const pokemonId = this.props.navigation.getParam('pokemon', { code: 0 }).code;
    this.props.pokemonDetailFetch(pokemonId);
  }

  render() {
    const { isLoading, info } = this.props.pokemon;

    return (
      <View style={styles.main_container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}
        >
          <Loading show={isLoading}>
            <PokeHeader info={info} />
            <View style={styles.stats_container}>
              <PokeStats data={info.stats} />
            </View>
            <PokeBox games={info.descriptions} />
            <PokeEvoluction chain={info.evoluctions} />
          </Loading>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    flexDirection: 'column',
    height: '100%'
  },
  types_container: {
    backgroundColor: '#BDBDBD',
    height: 40,
    padding: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stats_container: {
    paddingTop: 30,
    backgroundColor: '#fff',
    height: 240,
  },
});

function mapStateToProps({ pokemon }) {
  return { pokemon }
}

export default connect(mapStateToProps, { pokemonDetailFetch })(Detail);