import React from "react";
import {Content, Container, Text, H1, Header, Left, Button, Icon, Body, Title} from "native-base";
import Markdown from "react-native-easy-markdown";
import material from "../../../native-base-theme/variables/material";
import SafeAreaView from "react-native-safe-area-view";
export const PrivacyPolicyScreen = ({navigation}) => {

    return (
         <Container>

                <Header style={{paddingTop: 20,height: 64}}>

                    <Left>
                        <Button transparent onPress={() => {
                            navigation.goBack();
                        }}>
                            <Icon name='md-arrow-back'/>
                        </Button>
                    </Left>
                    <Body>
                        <Title>
                            Datenschutzerklärung
                        </Title>
                    </Body>
                </Header>
                <Content>
                    <Markdown style={markdownStyles}>
                        {privacyPolicy}
                    </Markdown>
                </Content>

            </Container>
    )
};

const markdownStyles = {

    padding: 10,
}

const privacyPolicy = `
Diese Datenschutzerklärung klärt Sie über die Art, den Umfang und Zweck der Verarbeitung von personenbezogenen Daten (nachfolgend kurz "Daten") im Rahmen der Erbringung unserer Leistungen sowie innerhalb der angebotenen mobilen Anwendung und der mit ihr verbundenen Webseiten, Funktionen und Inhalte sowie externen Onlinepräsenzen, wie z.B. unsere Social Media Profile (nachfolgend gemeinsam bezeichnet als "mobile Anwendung"). Im Hinblick auf die verwendeten Begrifflichkeiten, wie z.B. "Verarbeitung" oder "Verantwortlicher" verweisen wir auf die Definitionen im Art. 4 der Datenschutzgrundverordnung (DSGVO).

## Verantwortlicher

Uli F Wischnath,
Klimaschutz For All e. V.
Ritterhuder Str. 23
28237 Bremen
wischnath@klimaschutz4all.com
Impressum: http://klimaschutz4all.com/impressum

## Arten der verarbeiteten Daten

- Bestandsdaten (z.B., Personen-Stammdaten, Namen oder Adressen).
- Kontaktdaten (z.B., E-Mail, Telefonnummern).
- Inhaltsdaten (z.B., Texteingaben, Fotografien, Videos).
- Anwendungsdaten (z.B., App-Eingaben, Punktestände oder Entwicklungsstufen)
- Nutzungsdaten (z.B., besuchte Webseiten, Interesse an Inhalten, Zugriffszeiten).
- Meta-/Kommunikationsdaten (z.B., Geräte-Informationen, IP-Adressen).

## Kategorien betroffener Personen

Besucher und Nutzer der mobilen Anwendung (Nachfolgend bezeichnen wir die betroffenen Personen zusammenfassend auch als "Nutzer").
Zweck der Verarbeitung

- Zurverfügungstellung der mobilen Anwendung, ihrer Funktionen und Inhalte.
- Beantwortung von Kontaktanfragen und Kommunikation mit Nutzern.
- anonymisierte und/ oder agregierte Auswertungen von Anwendungsdaten zu Evaluationszwecken.
- Sicherheitsmaßnahmen.
- Reichweitenmessung/Marketing.

## Verwendete Begrifflichkeiten

"Personenbezogene Daten" sind alle Informationen, die sich auf eine identifizierte oder identifizierbare natürliche Person (im Folgenden "betroffene Person") beziehen; als identifizierbar wird eine natürliche Person angesehen, die direkt oder indirekt, insbesondere mittels Zuordnung zu einer Kennung wie einem Namen, zu einer Kennnummer, zu Standortdaten, zu einer Online-Kennung (z.B. Cookie) oder zu einem oder mehreren besonderen Merkmalen identifiziert werden kann, die Ausdruck der physischen, physiologischen, genetischen, psychischen, wirtschaftlichen, kulturellen oder sozialen Identität dieser natürlichen Person sind.

"Verarbeitung" ist jeder mit oder ohne Hilfe automatisierter Verfahren ausgeführte Vorgang oder jede solche Vorgangsreihe im Zusammenhang mit personenbezogenen Daten. Der Begriff reicht weit und umfasst praktisch jeden Umgang mit Daten.

"Pseudonymisierung" die Verarbeitung personenbezogener Daten in einer Weise, dass die personenbezogenen Daten ohne Hinzuziehung zusätzlicher Informationen nicht mehr einer spezifischen betroffenen Person zugeordnet werden können, sofern diese zusätzlichen Informationen gesondert aufbewahrt werden und technischen und organisatorischen Maßnahmen unterliegen, die gewährleisten, dass die personenbezogenen Daten nicht einer identifizierten oder identifizierbaren natürlichen Person zugewiesen werden.

"Profiling" jede Art der automatisierten Verarbeitung personenbezogener Daten, die darin besteht, dass diese personenbezogenen Daten verwendet werden, um bestimmte persönliche Aspekte, die sich auf eine natürliche Person beziehen, zu bewerten, insbesondere um Aspekte bezüglich Arbeitsleistung, wirtschaftliche Lage, Gesundheit, persönliche Vorlieben, Interessen, Zuverlässigkeit, Verhalten, Aufenthaltsort oder Ortswechsel dieser natürlichen Person zu analysieren oder vorherzusagen.

Als "Verantwortlicher" wird die natürliche oder juristische Person, Behörde, Einrichtung oder andere Stelle, die allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten entscheidet, bezeichnet.

"Auftragsverarbeiter" eine natürliche oder juristische Person, Behörde, Einrichtung oder andere Stelle, die personenbezogene Daten im Auftrag des Verantwortlichen verarbeitet.

## Maßgebliche Rechtsgrundlagen

Nach Maßgabe des Art. 13 DSGVO teilen wir Ihnen die Rechtsgrundlagen unserer Datenverarbeitungen mit. Für Nutzer aus dem Geltungsbereich der Datenschutzgrundverordnung (DSGVO), d.h. der EU und des EWG gilt, sofern die Rechtsgrundlage in der Datenschutzerklärung nicht genannt wird, Folgendes:
Die Rechtsgrundlage für die Einholung von Einwilligungen ist Art. 6 Abs. 1 lit. a und Art. 7 DSGVO;
Die Rechtsgrundlage für die Verarbeitung zur Erfüllung unserer Leistungen und Durchführung vertraglicher Maßnahmen sowie Beantwortung von Anfragen ist Art. 6 Abs. 1 lit. b DSGVO;
Die Rechtsgrundlage für die Verarbeitung zur Erfüllung unserer rechtlichen Verpflichtungen ist Art. 6 Abs. 1 lit. c DSGVO;
Für den Fall, dass lebenswichtige Interessen der betroffenen Person oder einer anderen natürlichen Person eine Verarbeitung personenbezogener Daten erforderlich machen, dient Art. 6 Abs. 1 lit. d DSGVO als Rechtsgrundlage.
Die Rechtsgrundlage für die erforderliche Verarbeitung zur Wahrnehmung einer Aufgabe, die im öffentlichen Interesse liegt oder in Ausübung öffentlicher Gewalt erfolgt, die dem Verantwortlichen übertragen wurde ist Art. 6 Abs. 1 lit. e DSGVO.
Die Rechtsgrundlage für die Verarbeitung zur Wahrung unserer berechtigten Interessen ist Art. 6 Abs. 1 lit. f DSGVO.
Die Verarbeitung von Daten zu anderen Zwecken als denen, zu denen sie erhoben wurden, bestimmt sich nach den Vorgaben des Art 6 Abs. 4 DSGVO.
Die Verarbeitung von besonderen Kategorien von Daten (entsprechend Art. 9 Abs. 1 DSGVO) bestimmt sich nach den Vorgaben des Art. 9 Abs. 2 DSGVO.

## Sicherheitsmaßnahmen

Wir treffen nach Maßgabe der gesetzlichen Vorgabenunter Berücksichtigung des Stands der Technik, der Implementierungskosten und der Art, des Umfangs, der Umstände und der Zwecke der Verarbeitung sowie der unterschiedlichen Eintrittswahrscheinlichkeit und Schwere des Risikos für die Rechte und Freiheiten natürlicher Personen, geeignete technische und organisatorische Maßnahmen, um ein dem Risiko angemessenes Schutzniveau zu gewährleisten.

Zu den Maßnahmen gehören insbesondere die Sicherung der Vertraulichkeit, Integrität und Verfügbarkeit von Daten durch Kontrolle des physischen Zugangs zu den Daten, als auch des sie betreffenden Zugriffs, der Eingabe, Weitergabe, der Sicherung der Verfügbarkeit und ihrer Trennung. Des Weiteren haben wir Verfahren eingerichtet, die eine Wahrnehmung von Betroffenenrechten, Löschung von Daten und Reaktion auf Gefährdung der Daten gewährleisten. Ferner berücksichtigen wir den Schutz personenbezogener Daten bereits bei der Entwicklung, bzw. Auswahl von Hardware, Software sowie Verfahren, entsprechend dem Prinzip des Datenschutzes durch Technikgestaltung und durch datenschutzfreundliche Voreinstellungen.

## Zusammenarbeit mit Auftragsverarbeitern, gemeinsam Verantwortlichen und Dritten

Sofern wir im Rahmen unserer Verarbeitung Daten gegenüber anderen Personen und Unternehmen (Auftragsverarbeitern, gemeinsam Verantwortlichen oder Dritten) offenbaren, sie an diese übermitteln oder ihnen sonst Zugriff auf die Daten gewähren, erfolgt dies nur auf Grundlage einer gesetzlichen Erlaubnis (z.B. wenn eine Übermittlung der Daten an Dritte, wie an Zahlungsdienstleister, zur Vertragserfüllung erforderlich ist), Nutzer eingewilligt haben, eine rechtliche Verpflichtung dies vorsieht oder auf Grundlage unserer berechtigten Interessen (z.B. beim Einsatz von Beauftragten, Webhostern, etc.).

Sofern wir Daten anderen Unternehmen unserer Unternehmensgruppe offenbaren, übermitteln oder ihnen sonst den Zugriff gewähren, erfolgt dies insbesondere zu administrativen Zwecken als berechtigtes Interesse und darüberhinausgehend auf einer den gesetzlichen Vorgaben entsprechenden Grundlage.

## Übermittlungen in Drittländer

Sofern wir Daten in einem Drittland (d.h. außerhalb der Europäischen Union (EU), des Europäischen Wirtschaftsraums (EWR) oder der Schweizer Eidgenossenschaft) verarbeiten oder dies im Rahmen der Inanspruchnahme von Diensten Dritter oder Offenlegung, bzw. Übermittlung von Daten an andere Personen oder Unternehmen geschieht, erfolgt dies nur, wenn es zur Erfüllung unserer (vor)vertraglichen Pflichten, auf Grundlage Ihrer Einwilligung, aufgrund einer rechtlichen Verpflichtung oder auf Grundlage unserer berechtigten Interessen geschieht. Vorbehaltlich ausdrücklicher Einwilligung oder vertraglich erforderlicher Übermittlung, verarbeiten oder lassen wir die Daten nur in Drittländern mit einem anerkannten Datenschutzniveau, zu denen die unter dem "Privacy-Shield" zertifizierten US-Verarbeiter gehören oder auf Grundlage besonderer Garantien, wie z.B. vertraglicher Verpflichtung durch sogenannte Standardschutzklauseln der EU-Kommission, dem Vorliegen von Zertifizierungen oder verbindlichen internen Datenschutzvorschriften verarbeiten (Art. 44 bis 49 DSGVO, Informationsseite der EU-Kommission).

## Rechte der betroffenen Personen

Auskunftsrecht: Sie haben das Recht, eine Bestätigung darüber zu verlangen, ob betreffende Daten verarbeitet werden und auf Auskunft über diese Daten sowie auf weitere Informationen und Kopie der Daten entsprechend den gesetzlichen Vorgaben.

Recht auf Berichtigung: Sie haben entsprechend. den gesetzlichen Vorgaben das Recht, die Vervollständigung der Sie betreffenden Daten oder die Berichtigung der Sie betreffenden unrichtigen Daten zu verlangen.

Recht auf Löschung und Einschränkung der Verarbeitung: Sie haben nach Maßgabe der gesetzlichen Vorgaben das Recht zu verlangen, dass betreffende Daten unverzüglich gelöscht werden, bzw. alternativ nach Maßgabe der gesetzlichen Vorgaben eine Einschränkung der Verarbeitung der Daten zu verlangen.

Recht auf Datenübertragbarkeit: Sie haben das Recht, Sie betreffende Daten, die Sie uns bereitgestellt haben, nach Maßgabe der gesetzlichen Vorgaben in einem strukturierten, gängigen und maschinenlesbaren Format zu erhalten oder deren Übermittlung an einen anderen Verantwortlichen zu fordern.

Beschwerde bei Aufsichtsbehörde: Sie haben ferner nach Maßgabe der gesetzlichen Vorgaben das Recht, eine Beschwerde bei der zuständigen Aufsichtsbehörde einzureichen.

## Widerrufsrecht

Sie haben das Recht, erteilte Einwilligungen mit Wirkung für die Zukunft zu widerrufen.

## Widerspruchsrecht

Widerspruchsrecht: Sie haben das Recht, aus Gründen, die sich aus Ihrer besonderen Situation ergeben, jederzeit gegen die Verarbeitung der Sie betreffenden personenbezogenen Daten, die aufgrund von Art. 6 Abs. 1 lit. e oder f DSGVO erfolgt, Widerspruch einzulegen; dies gilt auch für ein auf diese Bestimmungen gestütztes Profiling. Werden die Sie betreffenden personenbezogenen Daten verarbeitet, um Direktwerbung zu betreiben, haben Sie das Recht, jederzeit Widerspruch gegen die Verarbeitung der Sie betreffenden personenbezogenen Daten zum Zwecke derartiger Werbung einzulegen; dies gilt auch für das Profiling, soweit es mit solcher Direktwerbung in Verbindung steht.

## Cookies und Widerspruchsrecht bei Direktwerbung

Als "Cookies" werden kleine Dateien bezeichnet, die auf Rechnern der Nutzer gespeichert werden. Innerhalb der Cookies können unterschiedliche Angaben gespeichert werden. Ein Cookie dient primär dazu, die Angaben zu einem Nutzer (bzw. dem Gerät auf dem das Cookie gespeichert ist) während oder auch nach seinem Besuch innerhalb einer mobilen Anwendung zu speichern. Als temporäre Cookies, bzw. "Session-Cookies" oder "transiente Cookies", werden Cookies bezeichnet, die gelöscht werden, nachdem ein Nutzer eine mobile Anwendung verlässt und seinen Browser schließt. In einem solchen Cookie kann z.B. der Inhalt eines Warenkorbs in einem Onlineshop oder ein Login-Status gespeichert werden. Als "permanent" oder "persistent" werden Cookies bezeichnet, die auch nach dem Schließen des Browsers gespeichert bleiben. So kann z.B. der Login-Status gespeichert werden, wenn die Nutzer diese nach mehreren Tagen aufsuchen. Ebenso können in einem solchen Cookie die Interessen der Nutzer gespeichert werden, die für Reichweitenmessung oder Marketingzwecke verwendet werden. Als "Third-Party-Cookie" werden Cookies bezeichnet, die von anderen Anbietern als dem Verantwortlichen, der die mobile Anwendung betreibt, angeboten werden (andernfalls, wenn es nur dessen Cookies sind spricht man von "First-Party Cookies").

Wir können temporäre und permanente Cookies einsetzen und klären hierüber im Rahmen unserer Datenschutzerklärung auf.

Sofern wir die Nutzer um eine Einwilligung in den Einsatz von Cookies bitten (z.B. im Rahmen einer Cookie-Einwilligung), ist die Rechtsgrundlage dieser Verarbeitung Art. 6 Abs. 1 lit. a. DSGVO. Ansonsten werden die personenbezogenen Cookies der Nutzer entsprechend den nachfolgenden Erläuterungen im Rahmen dieser Datenschutzerklärung auf Grundlage unserer berechtigten Interessen (d.h. Interesse an der Analyse, Optimierung und wirtschaftlichem Betrieb unserer mobilen Anwendung im Sinne des Art. 6 Abs. 1 lit. f. DSGVO) oder sofern der Einsatz von Cookies zur Erbringung unserer vertragsbezogenen Leistungen erforderlich ist, gem. Art. 6 Abs. 1 lit. b. DSGVO, bzw. sofern der Einsatz von Cookies für die Wahrnehmung einer Aufgabe, die im öffentlichen Interesse liegt erforderlich ist oder in Ausübung öffentlicher Gewalt erfolgt, gem. Art. 6 Abs. 1 lit. e. DSGVO, verarbeitet.

Falls die Nutzer nicht möchten, dass Cookies auf ihrem Rechner gespeichert werden, werden sie gebeten die entsprechende Option in den Systemeinstellungen ihres Browsers zu deaktivieren. Gespeicherte Cookies können in den Systemeinstellungen des Browsers gelöscht werden. Der Ausschluss von Cookies kann zu Funktionseinschränkungen dieser mobilen Anwendung führen.

Ein genereller Widerspruch gegen den Einsatz der zu Zwecken des Onlinemarketing eingesetzten Cookies kann bei einer Vielzahl der Dienste, vor allem im Fall des Trackings, über die US-amerikanische Seite http://www.aboutads.info/choices/ oder die EU-Seite http://www.youronlinechoices.com/ erklärt werden. Des Weiteren kann die Speicherung von Cookies mittels deren Abschaltung in den Einstellungen des Browsers erreicht werden. Bitte beachten Sie, dass dann gegebenenfalls nicht alle Funktionen dieser mobilen Anwendung genutzt werden können.

## Löschung von Daten

Die von uns verarbeiteten Daten werden nach Maßgabe der gesetzlichen Vorgaben gelöscht oder in ihrer Verarbeitung eingeschränkt. Sofern nicht im Rahmen dieser Datenschutzerklärung ausdrücklich angegeben, werden die bei uns gespeicherten Daten gelöscht, sobald sie für ihre Zweckbestimmung nicht mehr erforderlich sind und der Löschung keine gesetzlichen Aufbewahrungspflichten entgegenstehen.

Sofern die Daten nicht gelöscht werden, weil sie für andere und gesetzlich zulässige Zwecke erforderlich sind, wird deren Verarbeitung eingeschränkt. D.h. die Daten werden gesperrt und nicht für andere Zwecke verarbeitet. Das gilt z.B. für Daten, die aus handels- oder steuerrechtlichen Gründen aufbewahrt werden müssen.

## Änderungen und Aktualisierungen der Datenschutzerklärung

Wir bitten Sie sich regelmäßig über den Inhalt unserer Datenschutzerklärung zu informieren. Wir passen die Datenschutzerklärung an, sobald die Änderungen der von uns durchgeführten Datenverarbeitungen dies erforderlich machen. Wir informieren Sie, sobald durch die Änderungen eine Mitwirkungshandlung Ihrerseits (z.B. Einwilligung) oder eine sonstige individuelle Benachrichtigung erforderlich wird.

## Erbringung unserer satzungs- und geschäftsgemäßen Leistungen

Wir verarbeiten die Daten unserer Mitglieder, Unterstützer, Interessenten, Kunden oder sonstiger Personen entsprechend Art. 6 Abs. 1 lit. b. DSGVO, sofern wir ihnen gegenüber vertragliche Leistungen anbieten oder im Rahmen bestehender geschäftlicher Beziehung, z.B. gegenüber Mitgliedern, tätig werden oder selbst Empfänger von Leistungen und Zuwendungen sind. Im Übrigen verarbeiten wir die Daten betroffener Personen gem. Art. 6 Abs. 1 lit. f. DSGVO auf Grundlage unserer berechtigten Interessen, z.B. wenn es sich um administrative Aufgaben oder Öffentlichkeitsarbeit handelt.

Die hierbei verarbeiteten Daten, die Art, der Umfang und der Zweck und die Erforderlichkeit ihrer Verarbeitung bestimmen sich nach dem zugrundeliegenden Vertragsverhältnis. Dazu gehören grundsätzlich Bestands- und Stammdaten der Personen (z.B., Name, Adresse, etc.), als auch die Kontaktdaten (z.B., E-Mailadresse, Telefon, etc.), die Vertragsdaten (z.B., in Anspruch genommene Leistungen, mitgeteilte Inhalte und Informationen, Namen von Kontaktpersonen) und sofern wir zahlungspflichtige Leistungen oder Produkte anbieten, Zahlungsdaten (z.B., Bankverbindung, Zahlungshistorie, etc.).

Wir löschen Daten, die zur Erbringung unserer satzungs- und geschäftsmäßigen Zwecke nicht mehr erforderlich sind. Dies bestimmt sich entsprechend der jeweiligen Aufgaben und vertraglichen Beziehungen. Im Fall geschäftlicher Verarbeitung bewahren wir die Daten so lange auf, wie sie zur Geschäftsabwicklung, als auch im Hinblick auf etwaige Gewährleistungs- oder Haftungspflichten relevant sein können. Die Erforderlichkeit der Aufbewahrung der Daten wird alle drei Jahre überprüft; im Übrigen gelten die gesetzlichen Aufbewahrungspflichten.

## Hosting und E-Mail-Versand

Die von uns in Anspruch genommenen Hosting-Leistungen dienen der Zurverfügungstellung der folgenden Leistungen: Infrastruktur- und Plattformdienstleistungen, Rechenkapazität, Speicherplatz und Datenbankdienste, E-Mail-Versand, Sicherheitsleistungen sowie technische Wartungsleistungen, die wir zum Zwecke des Betriebs dieser mobilen Anwendung einsetzen.

Hierbei verarbeiten wir, bzw. unser Hostinganbieter Bestandsdaten, Kontaktdaten, Inhaltsdaten, Vertragsdaten, Nutzungsdaten, Meta- und Kommunikationsdaten von Kunden, Interessenten und Besuchern dieser mobilen Anwendung auf Grundlage unserer berechtigten Interessen an einer effizienten und sicheren Zurverfügungstellung dieser mobilen Anwendung gem. Art. 6 Abs. 1 lit. f DSGVO i.V.m. Art. 28 DSGVO (Abschluss Auftragsverarbeitungsvertrag).

## Erhebung von Zugriffsdaten und Logfiles

Wir, bzw. unser Hostinganbieter, erhebt auf Grundlage unserer berechtigten Interessen im Sinne des Art. 6 Abs. 1 lit. f. DSGVO Daten über jeden Zugriff auf den Server, auf dem sich dieser Dienst befindet (sogenannte Serverlogfiles). Zu den Zugriffsdaten gehören Name der abgerufenen Webseite, Datei, Datum und Uhrzeit des Abrufs, übertragene Datenmenge, Meldung über erfolgreichen Abruf, Browsertyp nebst Version, das Betriebssystem des Nutzers, Referrer URL (die zuvor besuchte Seite), IP-Adresse und der anfragende Provider.

Logfile-Informationen werden aus Sicherheitsgründen (z.B. zur Aufklärung von Missbrauchs- oder Betrugshandlungen) für die Dauer von maximal 7 Tagen gespeichert und danach gelöscht. Daten, deren weitere Aufbewahrung zu Beweiszwecken erforderlich ist, sind bis zur endgültigen Klärung des jeweiligen Vorfalls von der Löschung ausgenommen.

## Onlinepräsenzen in sozialen Medien

Wir unterhalten Onlinepräsenzen innerhalb sozialer Netzwerke und Plattformen, um mit den dort aktiven Kunden, Interessenten und Nutzern kommunizieren und sie dort über unsere Leistungen informieren zu können.

Wir weisen darauf hin, dass dabei Daten der Nutzer außerhalb des Raumes der Europäischen Union verarbeitet werden können. Hierdurch können sich für die Nutzer Risiken ergeben, weil so z.B. die Durchsetzung der Rechte der Nutzer erschwert werden könnte. Im Hinblick auf US-Anbieter die unter dem Privacy-Shield zertifiziert sind, weisen wir darauf hin, dass sie sich damit verpflichten, die Datenschutzstandards der EU einzuhalten.

Ferner werden die Daten der Nutzer im Regelfall für Marktforschungs- und Werbezwecke verarbeitet. So können z.B. aus dem Nutzungsverhalten und sich daraus ergebenden Interessen der Nutzer Nutzungsprofile erstellt werden. Die Nutzungsprofile können wiederum verwendet werden, um z.B. Werbeanzeigen innerhalb und außerhalb der Plattformen zu schalten, die mutmaßlich den Interessen der Nutzer entsprechen. Zu diesen Zwecken werden im Regelfall Cookies auf den Rechnern der Nutzer gespeichert, in denen das Nutzungsverhalten und die Interessen der Nutzer gespeichert werden. Ferner können in den Nutzungsprofilen auch Daten unabhängig der von den Nutzern verwendeten Geräte gespeichert werden (insbesondere wenn die Nutzer Mitglieder der jeweiligen Plattformen sind und bei diesen eingeloggt sind).

Die Verarbeitung der personenbezogenen Daten der Nutzer erfolgt auf Grundlage unserer berechtigten Interessen an einer effektiven Information der Nutzer und Kommunikation mit den Nutzern gem. Art. 6 Abs. 1 lit. f. DSGVO. Falls die Nutzer von den jeweiligen Anbietern der Plattformen um eine Einwilligung in die vorbeschriebene Datenverarbeitung gebeten werden, ist die Rechtsgrundlage der Verarbeitung Art. 6 Abs. 1 lit. a., Art. 7 DSGVO.

Für eine detaillierte Darstellung der jeweiligen Verarbeitungen und der Widerspruchsmöglichkeiten (Opt-Out), verweisen wir auf die nachfolgend verlinkten Angaben der Anbieter.

Auch im Fall von Auskunftsanfragen und der Geltendmachung von Nutzerrechten, weisen wir darauf hin, dass diese am effektivsten bei den Anbietern geltend gemacht werden können. Nur die Anbieter haben jeweils Zugriff auf die Daten der Nutzer und können direkt entsprechende Maßnahmen ergreifen und Auskünfte geben. Sollten Sie dennoch Hilfe benötigen, dann können Sie sich an uns wenden.

- Facebook, -Seiten, -Gruppen, (Facebook Ireland Ltd., 4 Grand Canal Square, Grand Canal Harbour, Dublin 2, Irland) auf Grundlage einer Vereinbarung über gemeinsame Verarbeitung personenbezogener Daten - Datenschutzerklärung: https://www.facebook.com/about/privacy/, speziell für Seiten: https://www.facebook.com/legal/terms/information_about_page_insights_data , Opt-Out: https://www.facebook.com/settings?tab=ads und http://www.youronlinechoices.com, Privacy Shield: https://www.privacyshield.gov/participant?id=a2zt0000000GnywAAC&status=Active.

- Google/ YouTube (Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland) – Datenschutzerklärung:  https://policies.google.com/privacy, Opt-Out: https://adssettings.google.com/authenticated, Privacy Shield: https://www.privacyshield.gov/participant?id=a2zt000000001L5AAI&status=Active.

- Instagram (Instagram Inc., 1601 Willow Road, Menlo Park, CA, 94025, USA) – Datenschutzerklärung/ Opt-Out: http://instagram.com/about/legal/privacy/.

- Twitter (Twitter Inc., 1355 Market Street, Suite 900, San Francisco, CA 94103, USA) - Datenschutzerklärung: https://twitter.com/de/privacy, Opt-Out: https://twitter.com/personalization, Privacy Shield: https://www.privacyshield.gov/participant?id=a2zt0000000TORzAAO&status=Active.

- Pinterest (Pinterest Inc., 635 High Street, Palo Alto, CA, 94301, USA) – Datenschutzerklärung/ Opt-Out: https://about.pinterest.com/de/privacy-policy.

- LinkedIn (LinkedIn Ireland Unlimited Company Wilton Place, Dublin 2, Irland) - Datenschutzerklärung https://www.linkedin.com/legal/privacy-policy , Opt-Out: https://www.linkedin.com/psettings/guest-controls/retargeting-opt-out, Privacy Shield: https://www.privacyshield.gov/participant?id=a2zt0000000L0UZAA0&status=Active.

- Xing (XING AG, Dammtorstraße 29-32, 20354 Hamburg, Deutschland) - Datenschutzerklärung/ Opt-Out: https://privacy.xing.com/de/datenschutzerklaerung.

- Wakalet (Wakelet Limited, 76 Quay Street, Manchester, M3 4PR, United Kingdom) - Datenschutzerklärung/ Opt-Out: https://wakelet.com/privacy.html.

- Soundcloud (SoundCloud Limited, Rheinsberger Str. 76/77, 10115 Berlin, Deutschland) - Datenschutzerklärung/ Opt-Out: https://soundcloud.com/pages/privacy.

## Einbindung von Diensten und Inhalten Dritter

Wir setzen innerhalb unserers mobilen Anwendung auf Grundlage unserer berechtigten Interessen (d.h. Interesse an der Analyse, Optimierung und wirtschaftlichem Betrieb unserer mobilen Anwendung im Sinne des Art. 6 Abs. 1 lit. f. DSGVO) Inhalts- oder Serviceangebote von Drittanbietern ein, um deren Inhalte und Services, wie z.B. Videos oder Schriftarten einzubinden (nachfolgend einheitlich bezeichnet als "Inhalte").

Dies setzt immer voraus, dass die Drittanbieter dieser Inhalte, die IP-Adresse der Nutzer wahrnehmen, da sie ohne die IP-Adresse die Inhalte nicht an deren Browser senden könnten. Die IP-Adresse ist damit für die Darstellung dieser Inhalte erforderlich. Wir bemühen uns nur solche Inhalte zu verwenden, deren jeweilige Anbieter die IP-Adresse lediglich zur Auslieferung der Inhalte verwenden. Drittanbieter können ferner so genannte Pixel-Tags (unsichtbare Grafiken, auch als "Web Beacons" bezeichnet) für statistische oder Marketingzwecke verwenden. Durch die "Pixel-Tags" können Informationen, wie der Besucherverkehr auf den Seiten dieser Website ausgewertet werden. Die pseudonymen Informationen können ferner in Cookies auf dem Gerät der Nutzer gespeichert werden und unter anderem technische Informationen zum Browser und Betriebssystem, verweisende Webseiten, Besuchszeit sowie weitere Angaben zur Nutzung unserer mobilen Anwendung enthalten, als auch mit solchen Informationen aus anderen Quellen verbunden werden.

## Youtube

Wir binden die Videos der Plattform "YouTube" des Anbieters Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland, ein. Datenschutzerklärung: https://www.google.com/policies/privacy/, Opt-Out: https://adssettings.google.com/authenticated.

## Twitter

Innerhalb unserer mobilen Anwendung können Funktionen und Inhalte des Dienstes Twitter, angeboten durch die Twitter Inc., 1355 Market Street, Suite 900, San Francisco, CA 94103, USA, eingebunden werden. Hierzu können z.B. Inhalte wie Bilder, Videos oder Texte und Schaltflächen gehören, mit denen Nutzer Inhalte dieser mobilen Anwendung innerhalb von Twitter teilen können.
Sofern die Nutzer Mitglieder der Plattform Twitter sind, kann Twitter den Aufruf der o.g. Inhalte und Funktionen den dortigen Profilen der Nutzer zuordnen. Twitter ist unter dem Privacy-Shield-Abkommen zertifiziert und bietet hierdurch eine Garantie, das europäische Datenschutzrecht einzuhalten (https://www.privacyshield.gov/participant?id=a2zt0000000TORzAAO&status=Active). Datenschutzerklärung: https://twitter.com/de/privacy, Opt-Out: https://twitter.com/personalization.

Erstellt mit Datenschutz-Generator.de von RA Dr. Thomas Schwenke 

`