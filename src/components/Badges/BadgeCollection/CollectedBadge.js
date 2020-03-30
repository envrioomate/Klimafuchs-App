import React, {Component} from "react";
import {completionLevelToColor} from "../BadgeUtils";
import {FSModal} from "../../Common/FSModal";
import {Text} from "native-base";
import {Dimensions, Image, StyleSheet, TouchableOpacity, View} from "react-native";
import * as PropTypes from "prop-types";
import {CollectedBadgeDetails} from "./CollectedBadgeDetails";

export class CollectedBadge extends Component {
    state = {
        modalVisible: false
    };

    render() {
        let {completion} = this.props;
        const badge = completion.seasonPlanChallenge.challenge;
        const icon = badge.icon;
        const iconTint = completionLevelToColor(completion);
        //TODO Badge Border und text beschreibung +  completion text + externalLink
        return (
            <FSModal
                ref={(ref) => this.badgeDetails = ref}
                body={<CollectedBadgeDetails requestModalClose={() => this.badgeDetails.closeModal()} completion={completion}/>}
                darken
            >
                <TouchableOpacity
                    style={{
                        margin: 2,
                        elevation: 5,
                    }}
                    onPress={() => {
                        this.badgeDetails.openModal()
                    }}
                >
                    <View style={{backgroundColor: iconTint, ...styles.collected}}>
                        <Image style={{backgroundColor: iconTint, ...styles.collectedIcon}}
                               source={icon ? {uri: icon.url + '?date=' + (new Date()).getHours()} : require('../../../../assets/image_select.png')}
                               resizeMode="contain"
                        />
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{flex: 1, flexWrap: "wrap", textAlign: 'center', fontSize: 12, marginTop: 0}}>
                            {badge.title || badge.name}
                        </Text>
                    </View>
                </TouchableOpacity>
            </FSModal>
        )
    }
}

const styles = StyleSheet.create({
    collected: {
        width: (Dimensions.get('window').width / 3) - 10,
        height: (Dimensions.get('window').width / 3) - 10,
        borderRadius: 5,
        padding: 10,
        overflow: "hidden"
    },
    collectedIcon: {
        width: (Dimensions.get('window').width / 3) - 30,
        height: (Dimensions.get('window').width / 3) - 30,
    },
    modal: {
        backgroundColor: 'rgba(0,0,0,0)',
        margin: '5%',
    },
});

CollectedBadge.propTypes = {completion: PropTypes.any}