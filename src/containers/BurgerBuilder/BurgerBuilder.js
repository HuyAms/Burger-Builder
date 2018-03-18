import React, {Component} from 'react';
import Aux from '../../hoc/ReactAux/ReactAux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import * as actionTypes from '../../store/action';


class BurgerBuilder extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {}
  // }

  state = {
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false,
  };

  componentDidMount() {
    // axios.get('ingredients.json')
    //     .then(response => {
    //       this.setState({ingredients: response.data});
    // })
    //     .catch(error => {
    //       this.setState({error: true});
    // });
  }

  updatePurchaseState(updatedIngredients) {
    const ingredients = {
      ...updatedIngredients,
    };
    const sum = Object.keys(ingredients).map(igKey => {
      return ingredients[igKey];
    }).reduce((sum, el) => {
      return sum + el;
    }, 0);
    this.setState({purchasable: sum > 0});
  }

  purchaseHandler = () => {
    this.setState({purchasing: true});
  };

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  };

  purchaseContinuehandler = () => {
    //alert('You continue!');

    const queryParam = [];
    for (let i in this.props.ings) {
      queryParam.push(encodeURIComponent(i) + '=' +
          encodeURIComponent(this.props.ings[i]));
    }
    queryParam.push('price=' + this.props.totalPrice);
    const queryString = queryParam.join('&');
    this.props.history.push({
      pathname: 'checkout',
      search: '?' + queryString,
    });
  };

  render() {
    const disabledInfo = {
      ...this.props.ings,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;

    let burger = this.state.error ?
        <p>Ingredients can't be loaded</p> :
        <Spinner/>;

    if (this.props.ings) {
      burger = (
          <Aux>
            <Burger ingredients={this.props.ings}/>
            <BuildControls
                ingredientAdded={this.props.onIngredientAdded}
                ingredientRemoved={this.props.onIngredientRemoved}
                disabled={disabledInfo}
                purchasable={!this.state.purchasable}
                price={this.props.totalPrice}
                ordered={this.purchaseHandler}/>
          </Aux>
      );

      orderSummary = <OrderSummary
          price={this.props.totalPrice}
          ingredients={this.props.ings}
          purchaseCanceled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinuehandler}
      />;
    }

    if (this.state.loading) {
      orderSummary = <Spinner/>;
    }

    return (
        <Aux>
          <Modal show={this.state.purchasing}
                 modalClosed={this.purchaseCancelHandler}>
            {orderSummary}
          </Modal>
          {burger}
        </Aux>
    );
  }
}

const mapStateProps = state => {
  return {
    ings: state.ingredients,
    totalPrice: state.totalPrice
  }
}

const mapDispatchProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
    onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName}),
  }
}



export default connect(mapStateProps, mapDispatchProps)(withErrorHandler(BurgerBuilder, axios));