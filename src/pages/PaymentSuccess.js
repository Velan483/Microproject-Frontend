import React from 'react';
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import '../styles/payment.css';
import Header1 from '../components/Header1';
import logo from '../assets/logo.png';

const PaymentSuccessPage = () => {
  // Retrieve the invoice data from sessionStorage and ensure it's an array
  const storedData = sessionStorage.getItem('invoiceData');
  const invoiceData = storedData ? JSON.parse(storedData) : [];

  // Ensure invoiceData is an array
  const isValidArray = Array.isArray(invoiceData);

  // Define styles for the PDF document
  const styles = StyleSheet.create({
    page: {
      padding: 20,
      fontFamily: 'Helvetica',
      backgroundColor: '#f7f7f7',
    },
    logo: {
      width: 60,
      height: 60,
      marginBottom: 20,
      alignSelf: 'center',
    },
    header: {
      fontSize: 24,
      marginBottom: 20,
      textAlign: 'center',
      fontWeight: 'bold',
      color: '#333',
    },
    container: {
      margin: 20,
      padding: 15,
      border: '1px solid #ddd',
      borderRadius: 8,
      backgroundColor: '#fff',
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    label: {
      fontWeight: 'bold',
      color: '#333',
      fontSize: 14,
      width: '40%',
    },
    value: {
      color: '#555',
      fontSize: 14,
      width: '60%',
      textAlign: 'right',
    },
    footer: {
      marginTop: 20,
      textAlign: 'center',
      fontSize: 12,
      color: '#888',
    },
    table: {
      display: 'table',
      width: 'auto',
      marginTop: 20,
    },
    tableRow: {
      flexDirection: 'row',
    },
    tableCol: {
      width: '50%',
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: '#ddd',
      padding: 5,
    },
    tableCell: {
      fontSize: 12,
      color: '#333',
    },
    sectionHeader: {
      backgroundColor: '#e0f7fa',
      padding: 5,
      fontWeight: 'bold',
      color: '#00796b',
      marginBottom: 10,
    },
  });

  const MyDocument = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <Image style={styles.logo} src={logo} />
        <View style={styles.container}>
          {isValidArray ? (
            invoiceData.map((invoice) => (
              <View key={invoice.invoice_id}>
                <Text style={styles.sectionHeader}>PAYMENT RECEIPT</Text>
                <View style={styles.row}>
                  <Text style={styles.label}>Name:</Text>
                  <Text style={styles.value}>{invoice.violation?.violator?.name}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>License Plate:</Text>
                  <Text style={styles.value}>{invoice.violation?.violator?.license_plate}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>Vehicle Type:</Text>
                  <Text style={styles.value}>{invoice.violation?.violator?.vehicle_type}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>Vehicle Model:</Text>
                  <Text style={styles.value}>{invoice.violation?.violator?.vehicle_model}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>Date:</Text>
                  <Text style={styles.value}>{invoice.invoice_Date}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>Amount Paid:</Text>
                  <Text style={styles.value}>{invoice.amount}</Text>
                </View>
              </View>
            ))
          ) : (
            <Text>No invoice data available.</Text>
          )}
          <Text style={styles.footer}>
            Thank you for your payment. If you have any questions, please contact our support team.
          </Text>
        </View>
      </Page>
    </Document>
  );

  return (
    <div>
      <div className='page'>
        <Header1 />
      </div>
      <div className="payment-success-container">
        <h1>Payment Successful</h1>
        <p>Your payment has been processed successfully.</p>
        <PDFDownloadLink document={<MyDocument />} fileName="invoice-details.pdf">
          {({ loading }) => (loading ? 'Loading document...' : 'Download PDF')}
        </PDFDownloadLink>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
