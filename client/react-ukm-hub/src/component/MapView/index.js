import React, { Component } from 'react'
import GMaps from '../../../public/assets/js/gmaps.min.js'
import {connect} from 'react-redux'
import {fetchCompanyByCategory, fetchProfile} from '../../actions/index.js'
import Sidebar from '../Sidebar'
import Topbar from '../Topbar'
const compId = localStorage.getItem('companyId')

class MapView extends Component {
  constructor(){
    super()
    this.state = {
      topbarTitle: 'Map View',
      activeNavigation: ['active', '', '', '', ''],
      companyLoginLat: 0,
      companyLoginLng: 0,
      corporateIcon: 'https://s21.postimg.org/8hrapdesn/building.png',
      ukmIcon: 'https://s4.postimg.org/jlidgjun1/store.png',
      dataMapCompany: []
    }
  }

  componentWillMount(){

    // for (var i = 0; i < array.length; i++) {
    //   array[i]
    // }

    this.setState({
      companyLoginLat: -6.260697,
      companyLoginLng: 106.781391,
      // dataMapCompany: [
      //   {
      //     icon: this.state.ukmIcon,
      //     lat: -6.278097,
      //     lng: 106.781391,
      //     infoWindow: {
      //       content: `
      //       <div style='padding:25px'>
      //         <div class="row">
      //           <div class="col-sm-3">
      //             <img
      //               src='http://s-yoolk-images.s3.amazonaws.com/id/gallery_images/medium/1435984612/1572891?1435984612'
      //               style="width: 118px; height:100px; border-radius: 5px; filter:grayscale(0.3) opacity(0.9)"
      //             />
      //           </div>
      //           <div class="col-sm-9" style="margin-top: -20px; padding-left:30px">
      //             <h3><b>UKM KEYBOARD</b></h3>
      //             <p><b>Alamat : </b>Jl. Pondok Indah Mall 2</p>
      //             <p><b>Telepon : </b>+6283124512523</p>
      //           </div>
      //         </div>
      //         <hr />
      //         <div class="row">
      //           <div class="col-sm-12">
      //             <p><b>Detail : </b></p>
      //             <p>Jalan maju bersama merupakan ukm yang bergelut di bidang kain</p>
      //             <p><b>Category : </b>Pakaian, Kecantikan</p>
      //
      //             <p><b>Request : </b>
      //               <div class="card">
      //                 <ul class="list-group list-group-flush">
      //                   <li class="list-group-item"><a href="https://www.google.com">Request 1<a></li>
      //                   <li class="list-group-item"><a href="https://www.google.com">Request 2</a></li>
      //                 </ul>
      //               </div>
      //             </p>
      //             <a href="https://www.google.com" target="_blank">Website link</a>
      //           </div>
      //         </div>
      //       </div>
      //       `
      //       }
      //   },
      //   {
      //     icon: this.state.ukmIcon,
      //     lat: -6.270697,
      //     lng: 106.791391,
      //     infoWindow: {
      //       content: `
      //         <div style='padding:25px'>
      //           <div class="row">
      //             <div class="col-sm-3">
      //               <img
      //                 src='http://s-yoolk-images.s3.amazonaws.com/id/gallery_images/medium/1435984612/1572891?1435984612'
      //                 style="width: 118px; height:100px; border-radius: 5px; filter:grayscale(0.3) opacity(0.9)"
      //               />
      //             </div>
      //             <div class="col-sm-9" style="margin-top: -20px; padding-left:30px">
      //               <h3><b>UKM Jalan Maju Bersama</b></h3>
      //               <p><b>Alamat : </b>Jl. Pondok Indah Mall</p>
      //               <p><b>Telepon : </b>+6283806781188</p>
      //             </div>
      //           </div>
      //           <hr />
      //           <div class="row">
      //             <div class="col-sm-12">
      //               <p><b>Detail : </b></p>
      //               <p>Jalan maju bersama merupakan ukm yang bergelut di bidang pangan</p>
      //               <p><b>Category : </b>Pakaian, Kecantikan</p>
      //
      //               <p><b>Request : </b>
      //                 <div class="card">
      //                   <ul class="list-group list-group-flush">
      //                     <li class="list-group-item"><a href="https://www.google.com">Request 1<a></li>
      //                     <li class="list-group-item"><a href="https://www.google.com">Request 2</a></li>
      //                     <li class="list-group-item"><a href="https://www.google.com">Request 3</a></li>
      //                   </ul>
      //                 </div>
      //               </p>
      //               <a href="https://www.google.com" target="_blank">Website link</a>
      //             </div>
      //           </div>
      //         </div>
      //       `
      //     }
      //   },
      //   {
      //     icon: this.state.ukmIcon,
      //     lat: 1.106431,
      //     lng: 104.024560,
      //     infoWindow: {
      //       content: `
      //         <div style='padding:25px'>
      //           <div class="row">
      //             <div class="col-sm-3">
      //               <img
      //                 src='http://s-yoolk-images.s3.amazonaws.com/id/gallery_images/medium/1435984612/1572891?1435984612'
      //                 style="width: 118px; height:100px; border-radius: 5px; filter:grayscale(0.3) opacity(0.9)"
      //               />
      //             </div>
      //             <div class="col-sm-9" style="margin-top: -20px; padding-left:30px">
      //               <h3><b>UKM TIMO</b></h3>
      //               <p><b>Alamat : </b>Jl. Batam 1</p>
      //               <p><b>Telepon : </b>+6283803242352</p>
      //             </div>
      //           </div>
      //           <hr />
      //           <div class="row">
      //             <div class="col-sm-12">
      //               <p><b>Detail : </b></p>
      //               <p>Jalan maju bersama merupakan ukm yang bergelut di bidang pangan</p>
      //               <p><b>Category : </b>Ikan, Sambal</p>
      //
      //               <p><b>Request : </b>
      //                 <div class="card">
      //                   <ul class="list-group list-group-flush">
      //                     <li class="list-group-item"><a href="https://www.google.com">Request 1<a></li>
      //                     <li class="list-group-item"><a href="https://www.google.com">Request 2</a></li>
      //                     <li class="list-group-item"><a href="https://www.google.com">Request 3</a></li>
      //                     <li class="list-group-item"><a href="https://www.google.com">Request 2</a></li>
      //                     <li class="list-group-item"><a href="https://www.google.com">Request 3</a></li>
      //                   </ul>
      //                 </div>
      //               </p>
      //               <a href="https://www.google.com" target="_blank">Website link</a>
      //             </div>
      //           </div>
      //         </div>
      //       `
      //     }
      //   }
      // ]
    })
  }

  componentWillReceiveProps(){
    var temp = []
    var pathTemp = []
    const that = this
    console.log("this will receview props");

    setTimeout(function(){


      for (let i = 0; i < that.props.otherCompany.length; i++) {
        console.log(i);
        pathTemp[pathTemp.length] = [ that.props.profile.location.lat, that.props.profile.location.lng ]
        pathTemp[pathTemp.length] = [ that.props.otherCompany[i].location.lat, that.props.otherCompany[i].location.lng ]
      }
    }, 1500)

    for (let i = 0; i < this.props.otherCompany.length; i++) {
      temp[temp.length] =
      {
        title: this.props.otherCompany[i].name,
        icon: this.state.ukmIcon,
        lat: this.props.otherCompany[i].location.lat,
        lng: this.props.otherCompany[i].location.lng,
        infoWindow: {
          content:
          `
          <div style='padding:25px'>
            <div class="row">
              <div class="col-sm-3">
                <img
                  src=${this.props.otherCompany[i].images}
                  style="width: 118px; height:100px; border-radius: 5px; filter:grayscale(0.3) opacity(0.9)"
                />
              </div>
              <div class="col-sm-9" style="margin-top: -20px; padding-left:30px">
                <h3><b>${this.props.otherCompany[i].name}</b></h3>
                <p><b>Alamat : </b>${this.props.otherCompany[i].address}</p>
                <p><b>Telepon : </b>${this.props.otherCompany[i].phone}</p>
              </div>
            </div>
            <hr />
            <div class="row">
              <div class="col-sm-12">
                <p><b>Detail : </b></p>
                <p>${this.props.otherCompany[i].description}</p>
                <p><b>Category : </b>
                  ${ this.props.otherCompany[i].category.map(function(data){ return `${data}` }) }
                </p>
                <p><b>Request : </b>
                  <div class="card">
                    <ul class="list-group list-group-flush">

                      ${ this.props.otherCompany[i].request.map(function(data){ return `<li class="list-group-item"><a href="https://www.google.com">${data.title}<a></li>` }) }
                    </ul>
                  </div>
                </p>
                <a href="https://www.google.com" target="_blank">${this.props.otherCompany[i].website}</a>
              </div>
            </div>
          </div>
          `
        }
      }
    }

    setTimeout(function(){
      var map = new GMaps({
        el: '#map',
        lat: that.props.profile.location.lat,
        lng: that.props.profile.location.lng
      });

      // add login marker, on maps(it maybe corporate or ukm)

      map.addMarkers([{
        title: that.props.profile.name,
        icon: that.state.corporateIcon,
        lat: that.props.profile.location.lat,
        lng: that.props.profile.location.lng,
        details: that.props.profile.name
      }])


      map.addMarkers(temp)


      map.drawPolyline({
        path: pathTemp,
        strokeColor: 'rgba(100,100,100,0.8)',
        strokeOpacity: 0.5,
        strokeWeight: 5
      });
    },2000)
    // console.log(this.props.otherCompany, this.props.profile);
  }

  componentDidMount () {
    this.props.fetchCompanyByCategory(compId)
    this.props.fetchProfile(compId)



  }

  render () {
    return (
      <div className="wrapper">
        <Sidebar activeNavigation={this.state.activeNavigation} />
        <div className="main-panel" style={{overflow:'hidden'}}>
          <Topbar title={this.state.topbarTitle} />
          <div id="map" style={{width:'100%', height:'100%' }}></div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    profile : state.profile,
    otherCompany: state.companyByCategory
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProfile: (id) => dispatch(fetchProfile(id)),
    fetchCompanyByCategory: (id) => dispatch(fetchCompanyByCategory(id))
  }
  //return bindActionCreators({addTodo},dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(MapView)
