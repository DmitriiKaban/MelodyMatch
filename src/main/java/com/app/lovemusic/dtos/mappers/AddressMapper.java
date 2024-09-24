package com.app.lovemusic.dtos.mappers;

import com.app.lovemusic.dtos.AddressDto;
import com.app.lovemusic.entity.Address;
import org.springframework.stereotype.Component;

@Component
public class AddressMapper {

    public AddressDto toDto(Address address) {
        AddressDto addressDto = new AddressDto();
        addressDto.setCity(address.getCity());
        addressDto.setCountry(address.getCountry());
        addressDto.setStreet(address.getStreet());
        addressDto.setState(address.getState());
        address.setPostalCode(address.getPostalCode());

        return addressDto;
    }

    public Address toAddress(AddressDto addressDto) {
        Address address = new Address();
        address.setCity(addressDto.getCity());
        address.setCountry(addressDto.getCountry());
        address.setStreet(addressDto.getStreet());
        address.setState(addressDto.getState());
        address.setPostalCode(addressDto.getPostalCode());

        return address;
    }

}
