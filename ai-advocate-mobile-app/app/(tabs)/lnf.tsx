import React, { useState, useRef } from 'react';
import { Text, View, Image, TouchableOpacity, Linking, ScrollView, StyleSheet } from 'react-native';
import globalStyles from '../../assets/styles/global_styles';

export default function LNF() {
  const [text, setText] = useState('');
  const [activeButton, setActiveButton] = useState<string | null>('About');
  const [showFullPanel, setShowFullPanel] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const panelMembers = [
    { id: 1, name: 'John Smith', occupation: 'Human trafficking survivor', image: require('../../assets/images/John_Smith.png') },
    { id: 2, name: 'Jane Doe', occupation: 'Human trafficking survivor', image: require('../../assets/images/Jane_Doe.png') },
    { id: 3, name: 'John Smith', occupation: 'Human trafficking survivor', image: require('../../assets/images/John_Smith.png') },
    { id: 4, name: 'Jane Doe', occupation: 'Human trafficking survivor', image: require('../../assets/images/Jane_Doe.png') },
    { id: 5, name: 'John Smith', occupation: 'Human trafficking survivor', image: require('../../assets/images/John_Smith.png') },
    { id: 6, name: 'Jane Doe', occupation: 'Human trafficking survivor', image: require('../../assets/images/Jane_Doe.png') },
  ];

  const handlePhonePress = () => {
    const phoneNumber = 'tel:+18442492698';
    Linking.openURL(phoneNumber).catch(err => console.error('Failed to open phone:', err));
  };

  const handleEmailPress = () => {
    const email = 'mailto:executiveoffice@loverneverfailsus.com'; // Compose email
    Linking.openURL(email).catch(err => console.error('Failed to open email:', err));
  };

  const handleShowFullPanel = () => {
    setShowFullPanel(true);
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  };

  const renderAIAdvocateContent = () => {
    if (showFullPanel) {
      return (
        <View style={styles.fullPanelContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setShowFullPanel(false)}
          >
            <Text style={styles.backButtonText}>← Meet the Panel</Text>
          </TouchableOpacity>

          <View style={styles.gridContainer}>
            {panelMembers.map((member) => (
              <View style={styles.gridPanelMember} key={member.id}>
                <Image source={member.image} style={styles.panelImage} />
                <Text style={styles.panelName}>{member.name}</Text>
                <Text style={styles.panelOccupation}>{member.occupation}</Text>
              </View>
            ))}
          </View>
        </View>
      );
    }

    return (
      <>
        <Text style={styles.heading}>The Problem</Text>
        <Text style={styles.content}>
          The legislation language caters to a college-educated person. California's legislative priorities are targeted at poverty-related issues such as homelessness; people who are most impacted should intimately understand.
        </Text>
        <Text style={styles.heading}>The Solution: AI Advocate</Text>
        <Text style={styles.content}>
          We educate everyday people on legislation relevant to them; empowers everyday people to share their voice about what is being proposed; employs everyday people to screen AI output and ensure it is culturally and experientially insightful.
        </Text>

        <TouchableOpacity style={styles.bottomButton} onPress={openAIAdvocateWebsite}>
          <Text style={styles.buttonText}>Read More</Text>
        </TouchableOpacity>

        <Text style={[styles.backButtonText, { paddingLeft: 10 }]}>Meet the Panel</Text>
        <Text style={styles.content}>
        Our Panel is a group of experts who review and discuss legislative bills. The pros and cons of these discussions can be found on the relevant bill pages. Meet the 2024 panel below:
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScrollContainer}>
          {panelMembers.map((member) => (
            <View style={styles.panelMember} key={member.id}>
              <Image source={member.image} style={styles.panelImage} />
              <Text style={styles.panelName}>{member.name}</Text>
              <Text style={styles.panelOccupation}>{member.occupation}</Text>
            </View>
          ))}
        </ScrollView>

        <TouchableOpacity
          style={styles.bottomButton}
          onPress={handleShowFullPanel}
        >
          <Text style={styles.buttonText}>See All</Text>
        </TouchableOpacity>

        <Image
          source={require('../../assets/images/Infographic.png')}
          style={styles.image}
        />
      </>
    );
  };

  React.useEffect(() => {
    // Default "About" text is now set when the component mounts
    setActiveButton('About');
    setText(
      <View>
        <Text style={styles.content}>
          Love Never Fails empowers all people to express and experience our best sense of humanity. We do this by restoring, educating, and protecting survivors of human trafficking and their community.
        </Text>
      </View>
    );
  }, []);


  const handleButtonPress = (buttonType: string) => {
    setActiveButton(buttonType);
    setShowFullPanel(false);

    switch (buttonType) {
      case 'About':
        setText(
          <View>
            <Text style={styles.content}>
              Love Never Fails empowers all people to express and experience our best sense of humanity. We do this by restoring, educating, and protecting survivors of human trafficking and their community.
            </Text>
          </View>
        );
        break;

      case 'AI Advocate':
        setText(<View style={{ flex: 1 }}>{renderAIAdvocateContent()}</View>);
        break;

      case 'Contact Us':
        setText(
          <View style={styles.containerStyle}>
            {/* Phone Number Button */}
            <TouchableOpacity onPress={() => Linking.openURL('tel:(844) 249-2698')}>
              <Text style={[styles.underlineText]}>
                (844) 249-2698
              </Text>
            </TouchableOpacity>

            {/* Email Button */}
            <TouchableOpacity onPress={() => Linking.openURL('mailto:executiveoffice@loverneverfailsus.com')}>
              <Text style={[styles.underlineText]}>
                executiveoffice@loverneverfailsus.com
              </Text>
            </TouchableOpacity>

            {/* Mailing Address Section */}
            <Text style={[styles.content, styles.centeredText]}>
              <Text style={styles.heading2}>MAILING ADDRESS</Text>
              {'\n'}
              6937 Village Parkway #2074{' '}
              {'\n'}
              Dublin, CA 94568{' '}
              {'\n'}
              United States
            </Text>

            {/* Main Office / Community Engagement Center */}
            <Text style={[styles.content, styles.centeredText]}>
              <Text style={styles.heading2}>MAIN OFFICE / COMMUNITY ENGAGEMENT CENTER</Text>
              {'\n'}
              22580 Grand Street{' '}
              {'\n'}
              Hayward, CA 94541
            </Text>
            <Image
              source={require('../../assets/images/address_map.png')}
              style={styles.mapImage}
            />
          </View>
        );
        break;

      default:
        setText('');
    }
  };

  const openWebsite = () => {
    Linking.openURL('https://www.loveneverfailsus.com/').catch(err => console.error('Failed to open URL:', err));
  };

    const openAIAdvocateWebsite = () => {
      Linking.openURL('https://www.loveneverfailsus.com/ai-advocate').catch(err => console.error('Failed to open URL:', err));
    };



  React.useEffect(() => {
    if (activeButton === 'AI Advocate') {
      setText(<View style={{ flex: 1 }}>{renderAIAdvocateContent()}</View>);
    }
  }, [showFullPanel]);

  return (
    <ScrollView
      ref={scrollViewRef}
      contentContainerStyle={styles.scrollContainer}
    >
      {/* Background images */}
      <View style={styles.backgroundImages}>
        <Image source={require('../../assets/images/Vector 3.png')} style={styles.vector3Image} />
        <Image source={require('../../assets/images/Rectangle 105.png')} style={styles.rectangle105Image} />
      </View>

      {/* Content that is on top of background */}
      <View style={styles.contentContainer}>
        {/* Logo at the top */}
        <View style={styles.logoContainer}>
          <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
        </View>

        {/* All three buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, activeButton === 'About' && styles.activeButton]}
            onPress={() => handleButtonPress('About')}
          >
            <Text style={styles.buttonText}>About</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, activeButton === 'AI Advocate' && styles.activeButton]}
            onPress={() => handleButtonPress('AI Advocate')}
          >
            <Text style={styles.buttonText}>AI Advocate</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, activeButton === 'Contact Us' && styles.activeButton]}
            onPress={() => handleButtonPress('Contact Us')}
          >
            <Text style={styles.buttonText}>Contact Us</Text>
          </TouchableOpacity>
        </View>

        {/* Display dynamic text (for About, AI Advocate, etc.) */}
        {text}

        {/* About section with three vertical sections */}
        {activeButton === 'About' && (
          <View style={styles.aboutSection}>
            {/* Section 1 */}
            <View style={styles.section}>
              <Image source={require('../../assets/images/House_Img.png')} style={styles.sectionImage} />
              <View style={styles.textContainer}>
                <Text style={{ fontFamily: 'Montserrat_700Bold', fontSize: 16 }}>300+</Text>
                <Text style={{ fontFamily: 'Montserrat_400Regular', fontSize: 16 }}> Individuals Housed since 2011.</Text>
              </View>
            </View>

            {/* Section 2 */}
            <View style={styles.section}>
              <Image source={require('../../assets/images/Cap_Img.png')} style={styles.sectionImage} />
              <View style={styles.textContainer2}>
                <Text style={{ fontFamily: 'Montserrat_400Regular', fontSize: 16, textAlign: 'center' }}>
                  <Text style={{ fontFamily: 'Montserrat_700Bold' }}>600+</Text> Individuals Graduated from ITbiz tech academy.
                </Text>
              </View>
            </View>

            {/* Section 3 */}
            <View style={styles.section}>
              <Image source={require('../../assets/images/People_Img.png')} style={styles.sectionImage} />
              <View style={styles.textContainer}>
                <Text style={{ fontFamily: 'Montserrat_700Bold', fontSize: 16 }}>10,000+</Text>
                <Text style={{ fontFamily: 'Montserrat_400Regular', fontSize: 16 }}> Individuals touched yearly.</Text>
              </View>
            </View>

            {/* Button  */}
            <TouchableOpacity style={styles.sectionButton} onPress={openWebsite}>
              <Text style={styles.buttonText2}>Visit LNF Website</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: globalStyles.colors.white,
  },
  backgroundImages: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: -1,
  },
  vector3Image: {
    top: '0%',
    width: '100%',
    height: 750,
    resizeMode: 'cover',
  },
  rectangle105Image: {
    width: '100%',
    height: 600,
    resizeMode: 'cover',
    position: 'absolute',
    top: '60%',
  },
  contentContainer: {
    zIndex: 1,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
  },
  logoContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  logo: {
    width: 70,
    height: 68,
    resizeMode: 'contain',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    marginBottom: 20,
  },
  button: {
    backgroundColor: globalStyles.colors.white,
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: globalStyles.colors.darkGrey,
  },
  activeButton: {
    backgroundColor: globalStyles.colors.blue1,
  },
  buttonText: {
    color: globalStyles.colors.black,
    fontSize: 12,
    fontFamily: 'Montserrat_600SemiBold',
  },
  buttonText2: {
    color: globalStyles.colors.black,
    fontSize: 16,
    fontFamily: 'Montserrat_600SemiBold',
  },
  displayText: {
    fontFamily: 'Montserrat_400Regular',
    fontSize: 16,
    lineHeight: 24,
    color: globalStyles.colors.black,
    marginTop: 20,
    textAlign: 'left',
  },

  // About section
  aboutSection: {
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  section: {
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  sectionText: {
    fontFamily: 'Montserrat_400Regular',
    fontSize: 16,
    lineHeight: 24,
    color: globalStyles.colors.black,
    marginTop: 10,
    textAlign: 'center',
  },
sectionButton: {
  backgroundColor: globalStyles.colors.blue1,
  paddingVertical: 12,
  paddingHorizontal: 30,
  borderRadius: 8,
  marginTop: 20,
  marginBottom: 80,
  shadowColor: globalStyles.colors.black,
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.3,
  shadowRadius: 5,
  elevation: 3,
},

  textContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 25,
  },
  textContainer2: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 25,
    paddingHorizontal: 30,
    width: '100%',
  },

  heading: {
    fontFamily: 'Montserrat_600SemiBold',
    fontSize: 18,
    lineHeight: 27,
    color: globalStyles.colors.black,
    marginTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  content: {
    fontFamily: 'Montserrat_400Regular',
    fontSize: 16,
    lineHeight: 24,
    color: globalStyles.colors.black,
    marginTop: 10,
    marginBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
bottomButton: {
  backgroundColor: globalStyles.colors.blue1,
  paddingVertical: 12,
  paddingHorizontal: 30,
  borderRadius: 8,
  marginTop: 20,
  marginBottom: 40,
  alignSelf: 'flex-end',
  shadowColor: globalStyles.colors.black,
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.3,
  shadowRadius: 5,
  elevation: 3,
},

panelHeading: {
  fontFamily: 'Montserrat_400Regular',
  fontSize: 26,
  lineHeight: 27,
  color: globalStyles.colors.black,
  textAlign: 'left',
  paddingLeft: 10,
  marginTop: 10,
},

horizontalScrollContainer: {
  flexDirection: 'row',
  marginTop: 20,
  paddingHorizontal: 10,
},

panelMember: {
  marginRight: 20,
  width: 150,
  padding: 10,
  backgroundColor: globalStyles.colors.buttonBlue2,
  borderRadius: 8,
  shadowColor: globalStyles.colors.black,
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.3,
  shadowRadius: 5,
  elevation: 3,
  marginBottom: 30,
},

panelImage: {
  width: 110,
  height: 152,
  marginBottom: 10,
    resizeMode: 'contain',
    marginBottom: 10,
    alignSelf: 'center',
    justifyContent: 'center',

},

panelName: {
  fontFamily: 'Montserrat_600SemiBold',
  fontSize: 16,
  color: globalStyles.colors.black,
  marginBottom: 5,
  textAlign: 'left',
  paddingLeft: 10,
},

panelOccupation: {
  fontFamily: 'Montserrat_400Regular',
  fontSize: 12,
  color: globalStyles.colors.black,
  textAlign: 'left',
  paddingLeft: 10,
},
  fullPanelContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 10,
  },

  backButton: {
    paddingVertical: 10,
    paddingHorizontal: 0,
    marginBottom: 20,
  },

  backButtonText: {
    fontFamily: 'Montserrat_400Regular',
    fontSize: 26,
    color: globalStyles.colors.black,
  },

  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },

  gridPanelMember: {
    width: '47%',
    backgroundColor: globalStyles.colors.buttonBlue2,
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    shadowColor: globalStyles.colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
  },
    image: {
    marginTop: 30,
    padding: 10,
    marginBottom: 60,
},

// contact
underlineText: {
  fontFamily: 'Montserrat_600SemiBold',
  textAlign: 'center',
  textDecorationLine: 'underline',
  color: globalStyles.colors.black,
},
  heading2: {
  textAlign: 'center',
    fontFamily: 'Montserrat_700Bold',
    fontSize: 18,
    lineHeight: 27,
    color: globalStyles.colors.black,
    marginTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
   mapImage: {
     width: 350,
     height: 275,
     alignSelf: 'center',
     shadowColor: globalStyles.colors.black,
     shadowOffset: { width: 0, height: 4 },
     shadowOpacity: 0.3,
     shadowRadius: 5,
     elevation: 5,
    }
});