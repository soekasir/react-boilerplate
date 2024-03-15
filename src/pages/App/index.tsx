import React, { Component } from 'react'
import './App.scss' 
import { Dependency } from '../../utils/typedi';
import { FakerApi } from '../../service/api/FakerApi';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

@observer
export default class App extends Component {
  fakerApi=Dependency.get(FakerApi)

  @observable datas:any[]=[
    { firstname:'dave' }
  ];
  @observable counter=0;

  componentDidMount(): void {
    this.fakerApi.persons(5,'female').catch(console.log).then((res:any)=>{
      this.datas=res.data
    })
  }

  increaseCounter=()=>{
    ++this.counter
  }

  render() {
    return (
      <div className='app'>
        <div className='counter'>
          {this.counter}
          <button onClick={this.increaseCounter}>Increase Counter</button>
        </div>
        <div className='datas'>
          {this.datas.map((data,index)=><div key={'person '+index}>{data.firstname}</div>)}
        </div>
      </div>
    )
  }
}
