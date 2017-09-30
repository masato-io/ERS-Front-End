import { connect } from 'react-redux';
import { getERS_DispatchDetails } from '../actions/GetERS_DispatchAction'
import { withScriptjs, withGoogleMap, GoogleMap, Marker, DirectionsRenderer } from "react-google-maps"
import { compose, withProps, lifecycle } from "recompose";
import Geolocation from 'react-geolocation';

@connect((store) => {
  return {
    current_dispatch_assignment_array: store.ERS_DispatchDetails.current_dispatch_assignment_array,
    current_dispatch_crossstreets: store.ERS_DispatchDetails.current_dispatch_crossstreets,
    current_dispatch_description: store.ERS_DispatchDetails.current_dispatch_description,
    current_dispatch_district: store.ERS_DispatchDetails.current_dispatch_district,
    current_dispatch_id: store.ERS_DispatchDetails.current_dispatch_id,
    current_dispatch_physical_map_ref: store.ERS_DispatchDetails.current_dispatch_physical_map_ref,
    current_dispatch_radiofreq: store.ERS_DispatchDetails.current_dispatch_radiofreq,
    current_dispatch_address: store.ERS_DispatchDetails.current_dispatch_address,
    current_dispatch_time_stamp: store.ERS_DispatchDetails.current_dispatch_time_stamp,
    current_dispatch_misc: store.ERS_DispatchDetails.current_dispatch_misc,
  }
})


class ERS_DispatchDetails extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      latitudeStart: null,
      longitudeStart: null,
      latitudeEnd: 41.8525800,
      longitudeEnd: -87.6514100
    }
  }

  componentDidMount() {

    var urlParams = this.props.location.search;
    var id = urlParams.replace('?id=', '');

    this.props.dispatch(getERS_DispatchDetails(id))

    navigator.geolocation.getCurrentPosition(position => {
      this.setState({latitudeStart : position.coords.latitude})
      this.setState({longitudeStart : position.coords.longitude})
    }, () => {
      console.log('denied');
    });

  }

  render(){

    const { current_dispatch_description, current_dispatch_address, current_dispatch_assignment_array, current_dispatch_crossstreets, current_dispatch_radiofreq, current_dispatch_physical_map_ref, current_dispatch_time_stamp, current_dispatch_misc, current_dispatch_district, current_dispatch_id } = this.props;

    // const MapWithAMarker = withScriptjs(withGoogleMap(props =>
    //   <GoogleMap
    //     defaultZoom={8}
    //     defaultCenter={{ lat: this.state.latitude, lng: this.state.longitude }}
    //   >
    //     <Marker
    //       position={{ lat: this.state.latitude, lng: this.state.longitude }}
    //     />
    //   </GoogleMap>
    // ));

    const latitudeStart = this.state.latitudeStart;
    const longitudeStart = this.state.longitudeStart;
    const latitudeEnd = this.state.latitudeEnd;
    const longitudeEnd = this.state.longitudeEnd;

    const MapWithADirectionsRenderer = compose(
      withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
      }),
      withScriptjs,
      withGoogleMap,
      lifecycle({
        componentDidMount() {
          const DirectionsService = new google.maps.DirectionsService();
          DirectionsService.route({
            origin: new google.maps.LatLng(latitudeStart, longitudeStart),
            destination: new google.maps.LatLng(latitudeEnd, longitudeEnd),
            travelMode: google.maps.TravelMode.DRIVING,
          }, (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
              this.setState({
                directions: result,
              });
            } else {
              console.error(`error fetching directions ${result}`);
            }
          });
        }
      })
    )(props =>
      <GoogleMap
        defaultZoom={7}
        defaultCenter={new google.maps.LatLng(41.8507300, -87.6512600)}
      >
        {props.directions && <DirectionsRenderer directions={props.directions} />}
      </GoogleMap>
    );

    return (
      <div>

        <ul>
          <li>Description</li>
          <li>{current_dispatch_description}</li>
          <li>Address</li>
          <li>{current_dispatch_address}</li>
          <li>Apparatus Assigned</li>
          <li>{current_dispatch_assignment_array.map((vehicle) =>
            <span>{vehicle + ' '}</span>
          )}</li>
          <li>Nearest Cross Streets</li>
          <li>{current_dispatch_crossstreets}</li>
          <li>Radio Channel</li>
          <li>{current_dispatch_radiofreq}</li>
          <li>Physical Map Reference</li>
          <li>{current_dispatch_physical_map_ref}</li>
          <li>Dispatch Timeout</li>
          <li>{current_dispatch_time_stamp}</li>
          <li>Misc. Details</li>
          <li>{current_dispatch_misc}</li>
        </ul>

        {!this.state.longitudeStart
          ?
          <div></div>
          :
          // <MapWithAMarker
          //   googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
          //   loadingElement={<div style={{ height: `100%` }} />}
          //   containerElement={<div style={{ height: `400px` }} />}
          //   mapElement={<div style={{ height: `100%` }} />}
          // />
          <MapWithADirectionsRenderer />
        }


      </div>
    )
  }
}

export default ERS_DispatchDetails;
window.ERS_DispatchDetails = ERS_DispatchDetails;
