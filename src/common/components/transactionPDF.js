import React from 'react'
import moment from 'moment';
import { Page, Text, View, Document, StyleSheet, Link, Svg, G, Path } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        padding: "20px 16px"
    },
    table: {
        width: '100%',
    },
    headRow: {
        fontSize: '12px',
        backgroundColor: "#9fa9ba",
        color: "white",
        flexGrow: 1,
        flexDirection: 'row',
    },
    heading: {
        fontSize: "20px",
        fontWeight: "800",
        color: "#1e1e1e"
    },
    flexGrow1: {
        flexGrow: 1,
    },
    header: {
        flexGrow: 1,
        marginBottom: 10
    },
    bold: {
        fontWeight: 'bold',
    },
    time: {
        fontSize: "11px",
        color: "#787878"
    },
    transactionHash: {
        flex: 3,
        wordBreak: 'break-all',
        margin: 10,
    },
    bodyRow: {
        flexGrow: 1,
        flexDirection: 'row',
        fontSize: "13px"
    },
    tableBodyText: {
        flex: 2,
        wordBreak: 'break-all',
        margin: "10",
        color: "#484848",
        fontWeight:"normal"
    },
    tableHeads:{
        flex: 2,
        wordBreak: 'break-all',
        margin: "10",

    },
    headingData: {
        flexGrow: 8
    },
    link: {
        color: "#3763dd",
        textDecoration: "none"
    },
    horizontalline: {
        width: '100%',
        height: '1px',
        backgroundColor: '#f4f4f4',
        margin: '10 0'
    },
    footer: {
        position: 'absolute',
        bottom: 12,
        left: 16,
        right: 0,
        fontSize: '10px',
        flexGrow: 1,
        flexDirection: 'row',
        color: '#9fa9ba'
    },
    observerLink: {
        color: '#3763dd',
        textDecoration: "none"
    }

})
const PDF = ({ data }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View >
                <View style={styles.header}>
                    <View style={styles.bodyRow}>
                        <Svg style={styles.flexGrow1} width="35" height="35" viewBox="0 0 43 43" xmlns="http://www.w3.org/2000/svg">
                            <G fill-rule="nonzero" fill="none">
                                <Path d="M21.5 43a21.67 21.67 0 0 1-14.47-5.517A21.41 21.41 0 0 1 0 23.913L4.857 21.5 0 19.087a21.41 21.41 0 0 1 7.03-13.57c8.245-7.356 20.696-7.356 28.941 0A21.41 21.41 0 0 1 43 19.087L38.143 21.5 43 23.913a21.41 21.41 0 0 1-7.03 13.57A21.668 21.668 0 0 1 21.5 43z" fill="#2149B9" />
                                <Path fill="#FFF" d="M17.385 30 21 23.764 24.604 30H28l-5.181-8.57L27.885 13h-3.362L21 19.143 17.477 13h-3.362l5.078 8.43L14 30z" />
                            </G>
                        </Svg>
                        <View style={styles.headingData}>
                            <Text style={styles.heading} >Transaction Private Notes</Text>
                            <Text style={styles.time}>Exported on: {moment.utc().format("MMM DD YYYY HH:mm:ss")} UTC+</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.table}>
                    <View style={[styles.flexGrow1, styles.bold]}>
                        <View style={styles.headRow}>
                            <Text style={styles.transactionHash}>Transaction Hash</Text>
                            <Text style={styles.tableHeads}>Note</Text>
                            <Text style={styles.tableHeads}>Added On</Text>
                        </View>
                    </View>
                    {data.map((row, i) => (
                        <View style={styles.flexGrow1}>
                            <View style={styles.bodyRow}>
                                <Link
                                    style={[styles.transactionHash, styles.link]}
                                    src={`${process.env.REACT_APP_WEB_APP}transaction-details/${row.TransactionHash}`}
                                >
                                    {(row.TransactionHash).match(/.{1,30}/g).join(" ")}
                                </Link>
                                <Text style={styles.tableBodyText}>
                                    {row.Note}
                                </Text>
                                <View style={styles.tableBodyText}>
                                    <Text>{moment.utc(moment(row.AddedOn)).format("MMM DD YYYY")}</Text>
                                    <Text>{moment.utc(moment(row.AddedOn)).format("HH:mm:ss")} UTC+</Text>
                                </View>
                            </View>
                            <View style={styles.horizontalline}></View>
                        </View>
                    ))}
                </View>
            </View>
            <View style={styles.footer} fixed>
                <Text>Verify on: </Text>
                <Link style={styles.observerLink} src="https://observer.xdc.org/">www.observer.xdc.org</Link></View>
        </Page>
    </Document>
);
export default PDF;