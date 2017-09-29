export function SetCurrentDispatch(
  description,
  address,
  apparatus_id_array,
  nearest_xstreets,
  radio_channel,
  physical_map_ref,
  time_stamp,
  misc
) {
  return {
    type: 'SET_CURRENT_DISPATCH',
    payload: {
      description: description,
      address: address,
      apparatus_id_array: apparatus_id_array,
      nearest_xstreets: nearest_xstreets,
      radio_channel: radio_channel,
      physical_map_ref: physical_map_ref,
      time_stamp: time_stamp,
      misc: misc
    }
  };
}
