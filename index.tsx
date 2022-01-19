import React, { Component } from 'react';
import { render } from 'react-dom';
import { has } from 'lodash';
import Hello from './Hello';
import * as json from './data.json';
import './style.css';

interface AppProps {}
interface AppState {
  inner: number;
  searchBox: string;
}

const myObj = {};

class App extends Component<AppProps, AppState> {
  constructor(props) {
    super(props);
    this.state = {
      inner: 0,
      searchBox: '',
    };
    console.log('my JSON', json);
  }

  typeFileCheck = (opt, type = '', parent = '') => {
    if (type === 'file') {
      return (
        <div>
          <u style={{ marginLeft: '15px' }}>
            {<i className="far fa-file" style={{ color: 'gray' }} />}{' '}
            {this.getHighlightedText(opt, this.state.searchBox)}
          </u>
        </div>
      );
    } else if (has(opt, '0') && !Array.isArray(opt)) {
      const { name, type, contents } = opt['0'];
      if (type === 'directory') {
        return (
          <div>
            <p>
              <i className="far fa-folder" style={{ color: 'black' }} />
              {this.getHighlightedText(name, this.state.searchBox)}
              <div>{this.directoryCheck(contents, name)}</div>
            </p>
          </div>
        );
      }
    }
  };

  directoryCheck = (opt, parentDirectory = '') => {
    if (Array.isArray(opt)) {
      return opt.map((obj) => {
        if (obj.type === 'file') {
          return (
            <div>{this.typeFileCheck(obj.name, obj.type, parentDirectory)}</div>
          );
        } else {
          const { name, type, contents } = obj;
          myObj[name] = name;
          return (
            <div>
              <b>
                {<i className="far fa-folder" />}:{' '}
                {this.getHighlightedText(name, this.state.searchBox)}
              </b>
              <div style={{ marginLeft: '10px' }}>
                {this.directoryCheck(contents, name)}
              </div>
            </div>
          );
        }
      });
    }
  };

  getHighlightedText(text, highlight) {
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <span>
        {' '}
        {parts.map((part, i) => (
          <span
            key={i}
            style={
              part.toLowerCase() === highlight.toLowerCase()
                ? { fontWeight: 'bold', color: 'red' }
                : {}
            }
          >
            {part}
          </span>
        ))}{' '}
      </span>
    );
  }

  render() {
    return (
      <div style={{ background: '#cff', padding: '4px' }}>
        <div style={{ background: '#ccc', height: '25px', padding: '4px 4px' }}>
          Search the Folder/File :{' '}
          <input
            type="search"
            style={{ padding: '2px' }}
            placeholder="Type here.."
            name={'searchBox'}
            onChange={(e) => {
              this.setState({ searchBox: e.target.value });
            }}
            onClick={() => {
              if (this.state.searchBox) {
                this.setState({ searchBox: '' });
              }
            }}
          />
        </div>
        {this.typeFileCheck(json)}
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
