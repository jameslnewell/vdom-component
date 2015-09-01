# vdom-component

Component framework built on `virtual-dom`.

**STATUS:** *EXPERIMENTAL*

## Installation

    npm i --save vdom-component

## Usage
    
    var h = require('virtual-dom/h');
    var queue = require('vdom-render-queue');
    var component = require('vdom-component');
    
    // --- define the component ---
    
    var App = {
    
      controller: {
    
        onInit: function() {
          this.state.count = 0;
        },
    
        onClick: function() {
          this.state.count++;
          this.props.render();
        }
    
      },
    
      view: function(ctl) {
        return h('div', [
          h('span', ['Clicked ', ctl.state.count, ' times!']),
          h('button', {onclick: ctl.onClick.bind(ctl)}, 'Increment')
        ]);
      }
    
    };
    
    // --- render the component ---
    
    var render = queue(document.getElementById('app'), function() {
      return component(App, {render: render});
    });
    
    render();
  
## API

### controller

#### .onInit()

Called after the component state is initialised.

#### .onAttach(el)

Called after the component has been attached to the DOM.

#### .onDetach(el)

Called before the component has been removed from the DOM.
  
## ToDo

- JSX
- plugin api for stuff like default props and state


## License

The MIT License (MIT)

Copyright (c) 2015 James Newell