import React from 'react';

import Homepage from './pages/homepage/homepage.page';
import MainHeader from './components/header/header.component';
import MainFooter from './components/footer/footer.component';

function App() {
  return (
    <div>
      <MainHeader />
      <Homepage />
      <MainFooter />
    </div>
  );
}

export default App;
