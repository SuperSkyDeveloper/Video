import React, { useEffect, useState, useRef } from 'react';
import { View, ViewStyle, FlatList, ListRenderItem, Dimensions, ScrollView, Image, ActivityIndicator } from 'react-native';
import { Button, Header, TabBar, SideBar, TopNote, Text, Carousel } from '../../components';
import Video from 'react-native-video';

import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { color } from '../../theme/color';

const { height, width } = Dimensions.get('screen')

const CONTAINER: ViewStyle = {
    backgroundColor: 'grey',
    flex: 1,
}

interface IFeed {
    id?: number;
    created_at?: string;
    talent_id?: number;
    customer_id?: number;
    url?: string;
}

interface IState {
    feeds: IFeed[]
    showBottomSheet: boolean
    currentPage: number
    lastPage: number
    loading?: boolean
    startPage: number
    nextPage: number
}

const per_page = 5;

const FeedScreen = () => {
    const [state, setState] = useState<IState>({
        feeds: [],
        showBottomSheet: false,
        currentPage: 0,
        lastPage: 0,
        loading: false,
        startPage: 0,
        nextPage: 0,
    })

    const flatListRef = useRef<FlatList<IFeed> | null>(null);

    useEffect(() => {
        getFeeds(1, false);
    }, []);

    // useEffect(() => {
    //     if (flatListRef && state.feeds.length > per_page) {
    //         flatListRef.current?.scrollToIndex({
    //             index: 4,
    //         });
    //     }
    // }, [state.feeds])

    function handleShowBottomSheet(value: boolean) {
        setState(pre => ({
            ...pre,
            showBottomSheet: value
        }))
    }

    function getFeeds(page: number, reachedStart: boolean) {
        setState(pre => ({
            ...pre,
            loading: true,
        }))
        fetch(`https://stg.starzly.io/api/featured-videos?page=${page}&per_page=${per_page}&app=1&new=1`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
				'Content-Type': 'application/json',
            }
        }).then(res => res.json()).then(res => {
            setState(pre => ({
                ...pre,
                // feeds: res?.data,
                feeds: !pre.feeds ? res?.data : !reachedStart ? pre?.feeds?.length > per_page ? [...pre.feeds.slice(per_page), ...res?.data] : [...pre?.feeds, ...res?.data] : [...res?.data, ...pre?.feeds.slice(0, per_page)],
                currentPage: res?.current_page,
                lastPage: res?.last_page,
                startPage: !reachedStart ? pre.currentPage : pre.currentPage - 2,
                nextPage: !reachedStart ? res?.current_page : pre.currentPage - 1,
                loading: false,
            }))
        }).catch(error => {
            setState(pre => ({
                ...pre,
                loading: false,
            }))
            console.log('error response: ', error)
        })
    }

    function handleLoadMore(reachedStart: boolean) {
        const { currentPage, lastPage, loading, startPage, nextPage } = state;
        console.log('reached Start : ', reachedStart);
        
        if (!currentPage || !lastPage || loading) return;
        if (reachedStart && startPage - 1 > 0) {
            console.log('reached Start true, currentPage: ', currentPage);
            getFeeds(startPage - 1, reachedStart);
        } else if (!reachedStart && !(nextPage + 1 > lastPage)) {
            console.log('reached Start last page: ', currentPage);
            getFeeds(nextPage + 1, reachedStart);
        }
    }

    const { feeds, showBottomSheet, loading } = state;

    const renderFeeds: ListRenderItem<IFeed> = ({item, index}) => {
        const { url } = item;
        
        return (
            <React.Fragment>
                <Video 
                    source={{uri: url}}
                    style={{
                        height: height,
                        width: '100%',
                    }}
                    resizeMode='cover'
                    paused={false}
                    repeat={true}
                />
                <SideBar index={index}/>
                <TopNote onPress={() => handleShowBottomSheet(true)} />
            </React.Fragment>
        );
    }

    return (
        <View style={CONTAINER}>
            <Header title='Maged el Masry to All users' style={{zIndex: 1000}} />
            {
                loading &&
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', height: '100%', zIndex: 1000,}}>
                    <ActivityIndicator size="large" color={color.pink}/>
                </View>
            }
            <FlatList 
                ref={(ref) => {
                    flatListRef.current = ref
                }}
                data={feeds}
                keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
                renderItem={renderFeeds}
                onScroll={(event) => {
                    if (event.nativeEvent.contentOffset.y < -20) {
                        handleLoadMore(true);
                    }
                }}
                onEndReached={(event) => {
                    handleLoadMore(false);
                }}
                getItemLayout={(data, index) => ({
                    length: feeds.length,
                    offset: height * index,
                    index
                })}
            />
            <TabBar />

            {/* Product Bottom Sheet */}
            {
                showBottomSheet &&
                <View
                    style={{
                        position: 'absolute',
                        backgroundColor: color.white,
                        height: 0.8 * height,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        zIndex: 2000,
                        borderTopStartRadius: 20,
                        borderTopEndRadius: 20,
                        paddingHorizontal: 5,
                    }}
                >
                    <Button 
                        Icon={<Feather name='x' size={20} color={color.black} />} 
                        style={{alignItems: 'flex-end', padding: 15,}}
                        onPress={() => handleShowBottomSheet(false)}
                    />

                    <ScrollView>
                        <Carousel />

                        <View style={{flexDirection: 'row', flex: 1, justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 5, marginVertical: 10,}}>
                            <Text text='Top Notes: Bergamot, Grape Fruit, Apple' numberOfLines={1} style={{
                                width: 0.6 * width,
                            }} />
                            <Button
                                text='EXCLUSIVE'
                                style={{
                                    backgroundColor: color.pink,
                                    borderRadius: 8,
                                    padding: 5,
                                    paddingHorizontal: 10,
                                }}
                                textPreset='h3Bold'
                            />
                        </View>

                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-around',
                                marginHorizontal: 5,
                                alignItems: 'flex-start',
                                marginTop: 5,
                            }}
                        >
                            <Text text='Royalty Eau de Parfum - 100 ml' style={{
                                fontWeight: 'bold',
                                fontSize: 18,
                                width: 0.7 * width
                            }} />
                            <Text text='$140' style={{
                                fontWeight: 'bold',
                                fontSize: 18,
                                textDecorationLine: 'line-through'
                            }} />
                            <Text text='$99' style={{
                                fontWeight: 'bold',
                                fontSize: 18,
                                color: color.pink
                            }} />
                        </View>

                        <View style={{borderColor: color.black02, borderWidth: 0.5, margin: 5,}} />

                        <View
                            style={{
                                padding: 10,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}
                        >
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}>
                                <Image source={{ uri: 'https://stgmedia.starzly.io/videos/3/8/2022/1OJa5bHPRzxmJrHAgzHBIXFiaFi1Eh6ScU48oTPY-thumbnail00001.png'}} style={{
                                    width: 50, height: 50, borderRadius: 30,
                                }} />
                                <View style={{marginLeft: 10}}>
                                    <Text text='By Maged el Masry' />
                                    <View style={{
                                        flexDirection: 'row'
                                    }}>
                                        <Text text='Actors' />
                                        <MaterialCommunityIcons name='menu-right' size={20} />
                                        <Text text='Egypt' />
                                    </View>
                                </View>
                            </View>

                            <View>
                                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                                    <MaterialCommunityIcons name='star' size={20} color={color.yeallow01} />
                                    <Text text='4.9' />
                                </View>
                                <Text text='33 Reviews' />
                            </View>
                        </View>

                        <View style={{marginHorizontal: 5,}}>
                            <Text text='Description' />
                            <Text text='A perfume that captures hearts...' />
                            <Text text='Detailed as a piece of arts...' />
                            <Text text='Alters your mood and reality...' />
                            <Text text='Feelings speak of its sensuality...' />
                        </View>


                        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, marginHorizontal: 5,}}>
                            <Button
                                text='ADD VIDEO REVIEW'
                                style = {{
                                    backgroundColor: color.black,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    width: 140,
                                    paddingHorizontal: 10,
                                    justifyContent: 'space-around',
                                    borderRadius: 10,
                                    marginRight: 10,
                                }}
                                textPreset='h3Bold'
                                LeftIcon={<MaterialCommunityIcons name='video-plus-outline' size={30} color={color.white} />}
                            />
                            <Button
                                text='ADD TO CART'
                                style = {{
                                    backgroundColor: color.pink,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    // width: 140,
                                    paddingHorizontal: 10,
                                    justifyContent: 'space-around',
                                    borderRadius: 10,
                                    flexGrow: 1,
                                }}
                                textPreset='h3Bold'
                                LeftIcon={<Feather name='shopping-cart' size={20} color={color.white} />}
                            />
                        </View>
                        <View style={{height: 60,}} />
                    </ScrollView>
                </View>
            }
        </View>
    );
}

export default FeedScreen