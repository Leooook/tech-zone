import React, { useState, useCallback, useEffect } from 'react';
import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import ProductContext from './Store/Context';
import store from './Store/Redux';
import Client from './Contentful';
import MainPage from './Pages/mainPage';
import ProductsPage from './Pages/productsPage';
import DetailPage from './Pages/detailPage';
import CartPage from './Pages/cartPage';
import AboutPage from './Pages/aboutPage';
import ContactPage from './Pages/contactPage';
import ErrorPage from './Pages/errorPage';
import Nav from './Components/nav';
import Footer from './Components/footer';

import './App.css';

const App = () => {
  const [product, setProduct] = useState({
    products: [],
    featureProducts: [],
    sortedProducts: [],
    load: true,
    isCartOpen: false,
    cartNotOpen: false,
    isListOpen: false,
    isFixed: true,
    cartCountLogo: false,
    top: 0,

    search: '',
    brands: 'All',
    price: 0,
    maxPrice: 0,
    discount: false,
    freeShipping: false,
    freeReturn: false,
    sort: 'Default',
  });

  // Get data
  const formData = (data) => {
    return data.items.map((product) => {
      const brandPic = product.fields.brandPic.fields.file.url;
      const photo = product.fields.photo.map((image) => image.fields.file.url);
      product = { ...product.fields, brandPic, photo };
      return product;
    });
  };

  // Sort data
  const sortCompare = (property) => {
    return function (a, b) {
      var value1 = a[property];
      var value2 = b[property];
      return value1 - value2;
    };
  };

  // !!!!! redux后改
  const getData = useCallback(async () => {
    try {
      const data = await Client.getEntries({ content_type: 'techZone' });

      const products = formData(data).sort(sortCompare('slug'));
      const maxPrice = Math.max(...products.map((product) => product.price));
      let price = maxPrice;
      let featureProducts = products.filter(
        (product) => product.popular === true
      );
      let sortedProducts = products;

      setProduct({
        ...product,
        products,
        featureProducts,
        sortedProducts,
        load: false,
        price,
        maxPrice,
      });
    } catch (error) {
      console.log(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  // Flexible nav bar
  useEffect(() => {
    window.onscroll = () => {
      const scrollTop = Math.max(
        document.body.scrollTop,
        document.documentElement.scrollTop
      );
      if (
        scrollTop >= product.top &&
        product.isListOpen === false &&
        product.isCartOpen === false
      ) {
        setProduct({ ...product, top: scrollTop, isFixed: false });
      } else {
        setProduct({ ...product, top: scrollTop, isFixed: true });
      }
    };
  }, [product]);

  const openList = () => {
    setProduct({ ...product, isListOpen: !product.isListOpen });
  };

  const closeList = () => {
    setProduct({ ...product, isListOpen: false });
  };

  const cartOpen = () => {
    if (!product.cartNotOpen) {
      setProduct({
        ...product,
        isCartOpen: !product.isCartOpen,
        isFixed: true,
      });
    }
  };

  const cartClose = () => {
    if (!product.cartNotOpen) {
      setProduct({ ...product, isCartOpen: false, isFixed: true });
    }
  };

  const cartCantOpen = () => {
    if (!product.cartNotOpen) {
      setProduct({ ...product, cartNotOpen: true, isCartOpen: false });
    }
  };

  const cartCanOpen = () => {
    if (product.cartNotOpen) {
      setProduct({ ...product, cartNotOpen: false });
    }
  };

  const cartCountFlash = () => {
    setProduct((prevState) => ({ ...prevState, cartCountLogo: true }));
    setTimeout(() => {
      setProduct((prevState) => ({ ...prevState, cartCountLogo: false }));
    }, 200);
  };

  const getRoom = (slug) => {
    return product.products.filter(
      (product) => product.slug === parseInt(slug)
    )[0];
  };

  const compare = (value, type) => {
    if (value === 'price') {
      return (x, y) => {
        let a = x[value];
        let b = y[value];
        if (type === 0) {
          return a - b;
        } else {
          return b - a;
        }
      };
    }
    if (value === 'name') {
      return (x, y) => {
        let a = x[value];
        let b = y[value];
        if (type === 0) {
          return a.localeCompare(b);
        } else {
          return -a.localeCompare(b);
        }
      };
    }
  };

  const handleChange = (event) => {
    const target = event.target;
    let changeValue = {
      ...product,
      [target.name]: target.type === 'checkbox' ? target.checked : target.value,
    };

    sortProducts(changeValue);
  };

  const sortProducts = (changeValue) => {
    let {
      products,
      search,
      brands,
      price,
      maxPrice,
      discount,
      freeShipping,
      freeReturn,
      sort,
    } = changeValue;
    let tmpProducts = products;

    if (search !== '') {
      let reg = new RegExp(search, 'i');
      tmpProducts = tmpProducts.filter(
        (tmpProduct) => reg.test(tmpProduct.name) === true
      );
    }
    if (brands !== 'All') {
      tmpProducts = tmpProducts.filter(
        (tmpProduct) => tmpProduct.brand === brands
      );
    }
    if (parseInt(price) !== maxPrice) {
      tmpProducts = tmpProducts.filter(
        (tmpProduct) => tmpProduct.price <= parseInt(price)
      );
    }
    if (discount === true) {
      tmpProducts = tmpProducts.filter(
        (tmpProduct) => tmpProduct.discount === true
      );
    }
    if (freeReturn === true) {
      tmpProducts = tmpProducts.filter(
        (tmpProduct) => tmpProduct.freeReturn === true
      );
    }
    if (freeShipping === true) {
      tmpProducts = tmpProducts.filter(
        (tmpProduct) => tmpProduct.freeShipping === true
      );
    }
    if (sort === 'Price: High - Low') {
      tmpProducts = tmpProducts.sort(compare('price', 1));
    }
    if (sort === 'Price: Low - High') {
      tmpProducts = tmpProducts.sort(compare('price', 0));
    }
    if (sort === 'Name: A - Z') {
      tmpProducts = tmpProducts.sort(compare('name', 0));
    }
    if (sort === 'Name: Z - A') {
      tmpProducts = tmpProducts.sort(compare('name', 1));
    }

    setProduct((prevState) => ({
      ...prevState,
      ...changeValue,
      sortedProducts: tmpProducts,
    }));
  };

  return (
    <>
      <Provider store={store}>
        <ProductContext.Provider
          value={{
            ...product,
            openList,
            closeList,
            cartOpen,
            cartClose,
            cartCountFlash,
            cartCantOpen,
            cartCanOpen,
            getRoom,
            handleChange,
          }}
        >
          <Nav />
          <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path='products' element={<ProductsPage />} />
            <Route path='products/:slug' element={<DetailPage />} />
            <Route path='cart' element={<CartPage />} />
            <Route path='about' element={<AboutPage />} />
            <Route path='contact' element={<ContactPage />} />
            <Route path='/*' element={<ErrorPage />} />
          </Routes>
          <Footer />
        </ProductContext.Provider>
      </Provider>
    </>
  );
};

export default App;
