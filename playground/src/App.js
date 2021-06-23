import React from 'react';
import { Canvas } from 'viz-vimuth';

const posts = [
    {id: 1, title: 'Hello World', content: 'Welcome to learning React!'},
    {id: 2, title: 'Installation', content: 'You can install React from npm.'}
  ];

const App = ()  => {

    return (
        <Canvas udo={posts}/>
    );
}

export default App;