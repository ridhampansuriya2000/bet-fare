import React from 'react';


import styles from './RulesRegulationsPage.module.css';
import Logo from "../Logo";


const RulesRegulationsPage = () =>{
    return(
        <div className={styles.mainContainer}>
            <div className={styles.innerContainer}>
                <div className={`${styles.justifyCenter} mt-20 mb-20`}>
                    <Logo/>
                </div>

                <div className={`${styles.contentBox}`}>
                    <dl>
                        <div >
                            <dt className={styles.title}>The Site Rules And Regulations</dt>
                        </div>
                        <div >
                            <dt className={styles.title}>PART A - INTRODUCTION</dt>
                            <dt className={styles.title}>1. Use and interpretation</dt>
                            <dd className={styles.content}>These Rules and Regulations ("<b>Rules</b>") are part of the Site's terms and
                                conditions.
                            </dd>
                            <dd className={styles.content} >The Rules apply to all bets placed on this online betting platform ("<b>Site,</b>"). The
                                Rules consist of the following:
                            </dd>
                            <ul>
                                <dt className={styles.title}>This INTRODUCTION section (Part A);</dt>
                                <dt className={styles.title}>The GENERAL RULES (set out in Part B below); and</dt>
                                <dt className={styles.title}>The SPECIFIC SPORTS RULES (set out in Part C below - these apply to certain
                                    sports).
                                </dt>
                            </ul>
                            <dd className={styles.content} >The General Rules apply to all bets unless stated otherwise in the Specific Sports
                                Rules. If there is any inconsistency between the Specific Sports Rules and the General
                                Rules, the Specific Sports Rules shall prevail.
                            </dd>
                            <dd className={styles.content} >The rules governing how markets are offered, managed and/or settled are not the same for
                                every market on each product. In certain circumstances, a bet that is settled as a
                                winner on one product may be settled as a loser on the other product (and vice versa).
                                Additionally, different settlement rules may apply so that, for example, bets that are a
                                winner on one product may be settled as a dead heat or be voided on the other product.
                                Customers must ensure that they familiarise themselves with the relevant rules that
                                apply to the bets that they place on the Site.
                            </dd>
                            <dt className={styles.title}>2. Customer responsibility</dt>
                            <ul>
                                <dd className={styles.content} >Customers should make themselves aware of all of the Rules affecting any market on
                                    which they wish to place a bet.
                                </dd>
                                <dd className={styles.content} >In particular, customers who use the "one-click" option to place bets are solely
                                    responsible for their actions and the Site shall have no liability to such customers
                                    for any errors made by customers when using this option.
                                </dd>
                            </ul>
                            <dt className={styles.title}>PART B - GENERAL RULES</dt>
                            <dt className={styles.title}>1. Matters beyond the Site's reasonable control and malfunctions</dt>
                            <dd className={styles.content} >The Site is not liable for any loss or damage you may suffer because of any: act of God;
                                power cut; trade or labour dispute; act, failure or omission of any government or
                                authority; obstruction or failure of telecommunication services; or any other delay or
                                failure caused by a third party or otherwise outside of our control. In such an event,
                                the Site reserves the right to cancel or suspend access to the Site without incurring
                                any liability.
                            </dd>
                            <dd className={styles.content} >The Site is not liable for the failure of any equipment or software howsoever caused,
                                wherever located or administered, or whether under its direct control or not, that may
                                prevent the operation of the Site.
                            </dd>
                            <dd className={styles.content} >In the event of a technological failure or error which is apparent to the customer, the
                                customer is obliged to notify the Site of such failure/error immediately. If the
                                customer continues to place a bet in these circumstances, they shall take reasonable
                                action to minimise any potential loss. In the absence of such action, the Site reserves
                                the right to void a bet.
                            </dd>
                            <dd className={styles.content} >The Site reserves the right in its absolute discretion to restrict access to the Site,
                                or withhold funds or void any bets outstanding to a customer’s account in its absolute
                                discretion in the event of a technological failure or other malfunction which affects
                                the integrity of the Site whether this is under its direct control or otherwise.
                                Customers will be notified on the Site of any such malfunction which may operate to
                                prevent the placing of further bets or which may result in outstanding bets being
                                voided.
                            </dd>
                            <dt className={styles.title}>2. Managing markets In-Play</dt>
                            <dt className={styles.title}>General</dt>
                            <ul>
                                <dd className={styles.content} >
                                    For everything other than horseracing and greyhound racing, if a market is not
                                    scheduled to be turned in-play but the Site fails to suspend the market at the
                                    relevant time, then:
                                    <ol className="roman-ol">
                                        <dd className={styles.content} >if the event has a scheduled 'off' time, all bets matched after that
                                            scheduled off time will be void; and
                                        </dd>
                                        <dd className={styles.content} >if the event does not have a scheduled 'off' time, the Site will use its
                                            reasonable endeavours to ascertain the time of the actual 'off' and all bets
                                            after the time of the 'off' determined by the Site will be void.
                                        </dd>
                                    </ol>
                                </dd>
                                <dd className={styles.content} >For horseracing and greyhound racing, if a market is not scheduled to be turned
                                    in-play but the Site fails to suspend the market at the relevant time, then all bets
                                    matched after the official 'off' time will be void.
                                </dd>
                                <dd className={styles.content} >The Site aims to use its reasonable endeavours to suspend in-play markets at the
                                    start of and at the end of the event. However, the Site does not guarantee that such
                                    markets will be suspended at the relevant time.
                                </dd>
                                <dd className={styles.content} >Customers are responsible for managing their in-play bets at all times.</dd>
                                <dd className={styles.content} >For the purposes of in-play betting, customers should be aware that transmissions
                                    described as "live" by some broadcasters may actually be delayed or pre-recorded.
                                    The extent of any delay may vary depending on the set-up through which they are
                                    receiving pictures or data.
                                </dd>
                            </ul>
                            <dt className={styles.title}>All markets other than football markets - not suspending at the time of the 'off'</dt>
                            <ul>
                                <dd className={styles.content} >In relation to markets which are scheduled to be turned in-play, the Site aims to
                                    use its reasonable endeavours to turn such markets in-play at the time of the 'off'.
                                    However, the Site does not guarantee that such markets will be suspended and turned
                                    in-play at the time of the 'off'.
                                </dd>
                                <dd className={styles.content} >If a market is scheduled to be turned in-play but the Site does not suspend the
                                    market and cancel unmatched bets at the time of the 'off' and the market is not
                                    turned in-play with unmatched bets cancelled at any time during the event, all bets
                                    matched after the scheduled time of the 'off' will be void (in the case of
                                    horseracing and greyhound racing, bets will be void from the official rather than
                                    the scheduled 'off' time). If the event does not have a scheduled 'off' time, the
                                    Site will use its reasonable endeavours to ascertain the time of the actual 'off'
                                    and all bets after the time of the 'off' determined by the Site will be void.
                                </dd>
                                <dd className={styles.content} >If a market is scheduled to be turned in-play but the Site does not suspend the
                                    market at the time of the 'off' (so unmatched bets are not cancelled at that time),
                                    but the market is intentionally turned in-play at a later time during the event, all
                                    bets matched after the time of the 'off' will stand.
                                </dd>
                            </ul>
                            <dt className={styles.title}>3. Football markets - not suspending at kick-off or on the occurrence of a Material
                                Event and rules relating to VAR
                            </dt>
                            <ul>
                                <dd className={styles.content} >
                                    Not suspending at kick-off
                                    <ol className="roman-ol">
                                        <dd className={styles.content} >In relation to football markets that are scheduled to be turned in-play, the
                                            Site aims to use its reasonable endeavours to turn such markets in-play at
                                            kick-off and to suspend such markets on the occurrence of a Material Event
                                            (see definition of "Material Event" below).
                                        </dd>
                                        <dd className={styles.content} >The Site does not guarantee that such markets will be suspended and turned
                                            in-play at kick-off.
                                        </dd>
                                        <dd className={styles.content} >If a market is scheduled to be turned in-play but the Site does not suspend
                                            the market at kick-off and the market is not turned in-play at any time
                                            during the match, all bets matched after the scheduled time of the kick-off
                                            will be void.
                                        </dd>
                                        <dd className={styles.content} >If a market is scheduled to be turned in-play but the Site does not suspend
                                            the market at kick-off (so unmatched bets are not cancelled at that time),
                                            but the market is turned in-play at a later time during the match, all bets
                                            matched after the scheduled time of the kick-off and before the first
                                            "Material Event" will stand. However, if there has been one or more
                                            "Material Events", any bets matched between the first "Material Event" and
                                            the market being turned in-play will be void.
                                        </dd>
                                    </ol>
                                </dd>
                                <dd className={styles.content} >
                                    Not suspending on the occurrence of a Material Event and cancellations of Material
                                    Events due to VAR
                                    <ol>
                                        <dd className={styles.content} >If the Site does not suspend a market on time for the occurrence of a
                                            Material Event, the Site reserves the right to void bets unfairly matched
                                            after the Material Event has occurred. Voiding of these bets may take place
                                            during the event or retrospectively once a game is completed.
                                        </dd>
                                        <dd className={styles.content} >Where a Material Event is cancelled due to a determination made via a video
                                            assistant referee, the Site will void all bets which are matched between the
                                            occurrence of the Material Event and the cancellation of it. The voiding of
                                            any such bets may take place during the event or retrospectively once a game
                                            is completed.
                                        </dd>
                                    </ol>
                                </dd>
                                <dd className={styles.content} >
                                    Definition of "Material Event"
                                    <ol>
                                        <dd className={styles.content} >For the purpose of these Rules, a "Material Event" shall mean a goal being
                                            scored, a penalty being awarded or a player being sent off.
                                        </dd>
                                    </ol>
                                </dd>
                            </ul>
                            <dt className={styles.title}>4. Results and market settlement</dt>
                            <dt className={styles.title}>General</dt>
                            <ul>
                                <dd className={styles.content} >Markets will be settled in accordance as set out in the Specific Sports Rules.</dd>
                                <dd className={styles.content} >Where the Specific Sports Rules do not specify how and on what basis a market will
                                    be settled, markets will be settled on the official result of the relevant governing
                                    body regardless of any subsequent disqualification or amendment to the result
                                    (except if an amendment is announced within 24 hours of the initial settlement of
                                    the relevant market in order to correct an error in reporting the result).
                                </dd>
                                <dd className={styles.content} >If no official result of a relevant governing body is available, the result will be
                                    determined by the Site (acting reasonably) using information from independent
                                    sources. In such cases, if any new information comes into the public domain within
                                    48 hours of settlement, then the Site shall (acting reasonably) determine either:
                                    (i) whether the market should be reinstated or resettled in light of this new
                                    information; or (ii) whether or not to wait for further information before deciding
                                    whether to reinstate or resettle the market. Except where the Site has announced
                                    that it is waiting for further information, any information that comes into the
                                    public domain more than 48 hours after a market has been settled shall not be
                                    considered by the Site (regardless of whether or not such information may have led
                                    to a different result).
                                </dd>
                                <dd className={styles.content} >In the event of any uncertainty about any result or potential result, the Site
                                    reserves the right to suspend settlement of any market for an unlimited period until
                                    the uncertainty can be resolved to the reasonable satisfaction of the Site. The Site
                                    reserves the right to void any market if the uncertainty regarding settlement cannot
                                    be resolved to the Site's reasonable satisfaction.
                                </dd>
                            </ul>
                            <dt className={styles.title}>5. Resettlements</dt>
                            <ul>
                                <dd className={styles.content} >Markets are generally settled shortly after the end of the event in question. the
                                    Site may settle (or part-settle) some markets before the official result is declared
                                    (or may increase a customer's 'available to bet' balance by the minimum potential
                                    winnings of that customer on a given market) purely as a customer service benefit.
                                    However, the Site reserves the right to amend the settlement of the market if: (i)
                                    the official result is different to the result on which the Site initially settled
                                    the market; or (ii) if the whole market is eventually voided (e.g. for an abandoned
                                    event).
                                </dd>
                                <dd className={styles.content} >The Site reserves the right to reverse the settlement of a market if a market is
                                    settled in error (for example, a human or technical error).
                                </dd>
                                <dd className={styles.content} >If The Site resettles a market, this may lead to amendments being made to a
                                    customer's balance to reflect changes in market settlement.
                                </dd>
                            </ul>
                            <dt className={styles.title}>6. Non-runners, withdrawals and disqualifications</dt>
                            <ul>
                                <dd className={styles.content} >Subject always to the Site's right to void bets under its terms and conditions or
                                    for any exception under the Rules, if a market contains a statement that says "All
                                    bets stand, run or not" (or something similar), then all bets on a team or
                                    competitor will stand regardless of whether or not the team or competitor starts the
                                    event or takes any part in the event.
                                </dd>
                                <dd className={styles.content} >If a team or competitor is disqualified, withdraws or forfeits after starting an
                                    event they will be deemed a loser providing at least one other team or competitor
                                    completes the event. If no team or competitor completes an event (having started)
                                    then all bets will be void except for bets on any markets which have been
                                    unconditionally determined.
                                </dd>
                            </ul>
                            <dt className={styles.title}>7. Winner with [named selection]' markets</dt>
                            <ul>
                                <dd className={styles.content} >The Site may from time to time offer markets that are dependent on the participation
                                    of a particular competitor. If the competitor named in a 'Winner with …' market
                                    title does not participate in the tournament or event then all bets on the market
                                    will be void.
                                </dd>
                                <dd className={styles.content} >A team or competitor will be deemed to have participated if they have taken part to
                                    the extent necessary to record an official result or classification (including any
                                    disqualification but excluding any "did not start" or equivalent classification).
                                </dd>
                            </ul>
                            <dt className={styles.title}>8. Abandonments, Cancellations, Postponements</dt>
                            <dd className={styles.content} >Some markets have different rules and these are listed in the Specific Sports Rules.
                                However, where a market has no rules in the Specific Sports Rules in relation to an
                                abandonment, cancellation and/or postponement the following shall apply.
                            </dd>
                            <dd className={styles.content} >In relation to any match, fixture, game, individual event, or similar: If the event is
                                not completed within three days after the scheduled completion date, then all bets on
                                markets for this event will be void, except for bets on any markets that have been
                                unconditionally determined.
                            </dd>
                            <dd className={styles.content} >In relation to any tournament, competition or similar: If the event is not completed
                                within three days after the scheduled completion date, then any markets relating to the
                                event will be settled in accordance with the official ruling of the relevant governing
                                body, providing such a decision is given within 90 days after the scheduled completion
                                date. If no official ruling is announced in this 90 day period, then bets on any market
                                relating to this event will be void, except for bets on any markets which have been
                                unconditionally determined. If a market is to be voided but has been part-settled as a
                                courtesy to customers, then such part-settled bets will be reversed and all bets on the
                                market will be void.
                            </dd>
                            <dd className={styles.content} >The Site will decide (acting reasonably) whether a market relates to a match (or
                                similar) or a tournament (or similar).
                            </dd>
                            <dt className={styles.title}>9. Change of venue</dt>
                            <dd className={styles.content} >Some markets have different rules and these are listed in the Specific Sports Rules.
                            </dd>
                            <dd className={styles.content} >However, if change of venue is not dealt with in the Specific Sports Rules then the
                                following shall apply:
                            </dd>
                            <ul>
                                <dd className={styles.content} >For any team sport: if the scheduled venue is changed after the market is loaded by
                                    the Site, all bets will be void only if the new venue is a home ground of the
                                    original away team
                                </dd>
                                <dd className={styles.content} >For all categories or markets other than team sports: if the scheduled venue is
                                    changed after the market is loaded by the Site, all bets will stand.
                                </dd>
                                <dd className={styles.content} >If there is a change in the type of scheduled surface after the market has been
                                    loaded, all bets will stand.
                                </dd>
                            </ul>
                            <dt className={styles.title}>10. Periods of time</dt>
                            <dd className={styles.content} >Some markets have different rules and these are listed in the Specific Sports Rules.
                                However, if not dealt with in the Specific Sports Rules then the following shall apply.
                            </dd>
                            <dd className={styles.content} >If the scheduled duration of an event is changed after the market has been loaded but
                                before the start of the event, then all bets will be void.
                            </dd>
                            <dd className={styles.content} >Some markets refer to the length of time until an occurrence in the event (e.g. time of
                                first goal). If an event happens in stoppage or injury time after any regular time
                                period then it will be deemed to have occurred at the end of the regular time period.
                                For example, if a goal is scored in first half stoppage-time in a football match it will
                                be deemed to have occurred on 45 minutes.
                            </dd>
                            <dd className={styles.content} >All bets apply to the relevant full 'regular time' period including stoppage time. Any
                                extra-time and/or penalty shoot-out is not included.
                            </dd>
                            <dd className={styles.content} >References within these Rules to a particular number of 'days' shall mean the end of the
                                day local time after the expiry of the specified number of days.
                            </dd>
                            <dt className={styles.title}>11. "To qualify" markets</dt>
                            <dd className={styles.content} >Some markets have different rules and these are listed in the Specific Sports Rules.
                                However, if not dealt with in the Specific Sports Rules then the following shall apply.
                            </dd>
                            <dd className={styles.content} >Any 'to qualify' market (e.g. "to reach the final" markets) will be determined by the
                                competitor or team that qualifies, whether or not they take part in the next round or
                                event for which they have qualified. Markets will be settled after the qualifying stage
                                and any subsequent disqualification or amendment to the result will not count.
                            </dd>
                            <dt className={styles.title}>12. Dead heats</dt>
                            <dd className={styles.content} >Unless stated otherwise in the Specific Sports Rules the Dead Heat Rule applies to bets
                                on a market where there are more winners than expected.
                            </dd>
                            <dd className={styles.content} >For each bet matched on a relevant winning selection, the stake money is first reduced
                                in proportion by multiplying it by the sum of the number of winners expected, divided by
                                the number of actual winners (i.e. stake multiplied by (number of winners
                                expected/number of actual winners)). The winnings are then paid to the successful
                                backers on this 'reduced stake' (reduced stake multiplied by traded price) and the
                                remaining stake money is paid to the appropriate layers.
                            </dd>
                            <dt className={styles.title}>13. Miscellaneous</dt>
                            <ul>
                                <dd className={styles.content} >All references to time periods in the Rules relate to the time zone in which the
                                    event takes place.
                                    <span className="example">For example, a reference to the start time of a football match, relates to the local kick-off time.</span>
                                </dd>
                                <dd className={styles.content} >All information supplied by the Site is done so in good faith. However, the Site
                                    cannot accept liability for any errors or omissions in respect of any information,
                                    such as the posting of prices, runners, times, scores, results or general
                                    statistics.
                                </dd>
                                <dd className={styles.content} >The Site reserves the right to correct any obvious errors and shall take all
                                    reasonable steps to ensure markets are administered with integrity and transparency.
                                </dd>
                                <dd className={styles.content} >If an incorrect team or competitor name is displayed (excluding minor spelling
                                    mistakes) or the incorrect number of teams, competitors or outcomes is displayed in
                                    any complete market or a market is otherwise loaded using incorrect information or
                                    includes any obvious error, then the Site reserves the right to suspend the market
                                    and (providing it acts reasonably) to void all bets matched on the market.
                                </dd>
                                <dd className={styles.content} >Customers are responsible for ensuring that they satisfy themselves that the
                                    selection on which they place a bet is their intended selection.
                                    <span className="example">For example, in the case of a competitor bearing the same name as another individual not competing in the relevant event, the onus is on the customer to ensure that they know which competitor the Site has loaded into the relevant market and to ensure that they are placing their bet on their chosen competitor.</span>
                                </dd>
                                <dd className={styles.content} >The Site may, in its sole and absolute discretion, decide to suspend betting on a
                                    market at any time (even if such suspension is earlier than anticipated by the
                                    Rules). In the interests of maintaining integrity and fairness in the markets, the
                                    Site may also void certain bets in a market or void a whole market in its entirety.
                                </dd>
                                <dd className={styles.content} >In the event that members are unable to place bets due to technical issues or for
                                    any other reason, the Site has no obligation to accept bets in an alternate manner.
                                    Any bets attempted to be placed in another manner will not be accepted.
                                </dd>
                                <dd className={styles.content} >The Site reserves the right to void any bets placed on markets where an incorrect
                                    price or line was offered.
                                </dd>
                                <dd className={styles.content} >The Site reserves the right to close or suspend a customer’s account if it considers
                                    that that customer has used the Site in an unfair manner, has deliberately cheated
                                    or taken unfair advantage or if the customer’s account is being used for the benefit
                                    of a third party. The Site also reserves the right to close or suspend a customer’s
                                    account if it considers that it has been used in a fraudulent manner or for illegal
                                    and/or unlawful or improper purposes.
                                </dd>
                                <dd className={styles.content} >The Site reserves the right to amend the Rules at any time. Any such revision will
                                    be binding and effective immediately on the posting of such rule changes on the Site
                                    and any markets loaded after the new Rules have been posted shall be governed by the
                                    new Rules.
                                </dd>
                                <dd className={styles.content} >The Site reserves the right to cancel unmatched bets to protect customers at any
                                    time.
                                </dd>
                                <dd className={styles.content} >The Site shall use its reasonable endeavours to resolve disputes and shall act with
                                    fairness and integrity in exercising its rights under these rules. The Site’s
                                    decision in such cases shall be final and binding upon the customer.
                                </dd>
                                <dd className={styles.content} >
                                    On the settlement of any market, amounts relating to:
                                    <ol className="roman-ol">
                                        <dd className={styles.content} >winnings/losses on bets; and</dd>
                                        <dd className={styles.content} >any charges</dd>
                                    </ol>
                                    will be rounded up or down to the nearest two decimal places
                                </dd>
                            </ul>
                            <dt className={styles.title}>14. Multiple accounts</dt>
                            <dd className={styles.content} >Customers are not permitted to hold multiple accounts. This includes holding an account
                                with any other site operating on the same platform as this Site.
                            </dd>
                            <dd className={styles.content} >Customers who continue to operate multiple accounts will have their accounts "linked"
                                and managed accordingly which may affect the extent to which bets can be placed on the
                                Site.
                            </dd>
                            <dd className={styles.content} >If the Site believes, in its absolute discretion, that customers have registered and/or
                                used more than one account, and/or acted in collusion with one or more other individuals
                                through a number of different accounts, the Site reserves the right to void bets and/or
                                withhold any winnings arising from such a behaviour.
                            </dd>
                            <dt className={styles.title}>15. Use of Virtual Private Network (VPN) and Proxy Servers</dt>
                            <dd className={styles.content} >Customers using VPN applications to mask location or proxy servers to mask device are
                                liable to having bets invalidated.
                            </dd>
                            <dd className={styles.content} >Customers appearing from multiple IP locations are also liable to having bets
                                invalidated.
                            </dd>
                            <dt className={styles.title}>16. Cheating/Sniping</dt>
                            <dd className={styles.content} >Cheating of any kind is not allowed and customers who are deemed to be cheating are
                                liable to have bets made void.
                            </dd>
                            <dd className={styles.content} >Cheating includes but is not limited to; market price manipulation, court siding,
                                sniping, commission abuse and maximum bet/maximum win limit abuse.
                            </dd>
                            <dt className={styles.title}>17. Integrity</dt>
                            <dd className={styles.content} >The Site reserves the right to void any bets that are under review as part of any
                                integrity investigation.
                            </dd>
                            <dd className={styles.content} >The Site may void certain bets in a market or void a whole market in its entirety as a
                                result of any integrity investigation.
                            </dd>
                            <dd className={styles.content} >The Site’s decision in such integrity cases shall be final and binding upon the
                                customer.
                            </dd>
                            <dd className={styles.content} >PART C - SPECIFIC SPORTS RULES</dd>
                            <dt className={styles.title}>1. Cricket</dt>
                            <dt className={styles.title}>General</dt>
                            <ul>
                                <dd className={styles.content} >If a ball is not bowled during a competition, series or match then all bets will be
                                    void except for those on any market that has been unconditionally determined (e.g.
                                    in the 'Completed Match' market).
                                </dd>
                                <dd className={styles.content} >If a match is shortened by weather, all bets will be settled according to the
                                    official result (including for limited overs matches, the result determined by the
                                    Duckworth Lewis method).
                                </dd>
                                <dd className={styles.content} >In the event of a match being decided by a bowl-off or toss of the coin, all bets
                                    will be void except for those on markets that have been unconditionally determined.
                                </dd>
                            </ul>
                            <dt className={styles.title}>Test matches</dt>
                            <ul>
                                <dd className={styles.content} >If a match starts but is later abandoned for any reason other than weather (which
                                    may include but is not limited to: dangerous or unplayable wicket or outfield; pitch
                                    vandalism; strike or boycott; crowd protests/violence; stadium damage; acts of
                                    terrorism; and acts of God), the Site reserves the right to void all bets, except
                                    for those on markets that have been unconditionally determined.
                                </dd>
                                <dd className={styles.content} >If the match is not scheduled to be completed within five days after the original
                                    scheduled completion date, then all bets on markets for this event will be void,
                                    except for bets on any markets that have been unconditionally determined.
                                </dd>
                            </ul>
                            <dt className={styles.title}>Limited Over matches</dt>
                            <dd className={styles.content} >If a match is declared "No Result'', bets will be void on all markets for the event
                                except for those markets which have been unconditionally determined or where the minimum
                                number of overs have been bowled as laid out in the market specific information.
                            </dd>
                            <dd className={styles.content} >In the event of a new toss taking place on a scheduled reserve day for a limited overs
                                match all bets that were placed after 30 minutes before the original scheduled start of
                                play on the first day will be made void. This rule relates to all markets except those
                                that have been unconditionally determined (e.g. in the win the toss and toss combination
                                markets).
                            </dd>
                            <dd className={styles.content} >The Super Over market refers to the entire Super Over as a tie break mechanism. Where
                                only one Super Over is played, the Site will void all Super Over bets in the event of a
                                tied Super Over regardless of settlement rules elsewhere. In the event that more than
                                one Super Over is played, the site will settle all Super Over bets based on the winning
                                team of the final Super Over unless the final Super Over is tied in which case the Site
                                will void all Super Over bets.
                            </dd>
                            <dt className={styles.title}>Completed Match</dt>
                            <dd className={styles.content} >A match will be treated as "Completed" when the required number of overs for that game
                                have been completed as determined by the match officials. If the required number of
                                overs for that match has not been completed, the match will be treated as "Match
                                Abandoned" or "No Result" and bets will be settled accordingly.
                            </dd>
                            <dd className={styles.content} >Please be aware that bets will carry over onto any reserve day and will be settled on
                                the official result of the match. If a match is postponed or abandoned for any reason
                                other than weather (which may include but is not limited to: dangerous or unplayable
                                wicket or outfield; pitch vandalism; strike or boycott; crowd protests/violence; stadium
                                damage; acts of terrorism; and acts of God), The Site reserves the right to void all
                                bets on this market.
                            </dd>
                            <dt className={styles.title}>Sessions/Innings/Player Runs - Fancy</dt>
                            <ul>
                                <dd className={styles.content} >All session/innings/player runs are based on Haar-Jeet odds format.</dd>
                                <dd className={styles.content} >
                                    In the event of rain reduced innings:
                                    <ol className="roman-ol">
                                        <dd className={styles.content} >If an innings is curtailed before the original scheduled start of play, all
                                            bets will be settled.
                                        </dd>
                                        <dd className={styles.content} >If an innings is curtailed after start of play, then all bets on markets for
                                            this event will be settled up to the stipulated new innings length.
                                        </dd>
                                    </ol>
                                </dd>
                                <dd className={styles.content} >In any session market, in the event a session is not completed in full because a
                                    team is all out or declared, all bets will remain valid and the market will be
                                    settled at the innings score.
                                </dd>
                                <dd className={styles.content} >For Advance Session markets denoted by 'ADV' in market name only the 1st team to bat
                                    Innings markets are valid. For Test Matches the 1st innings for each team is valid.
                                </dd>
                                <dd className={styles.content} >We endeavour to suspended all ADV markets during the toss but this is not guaranteed
                                    for all events and dependent on media coverage. The site reserves the right to void
                                    bets deemed to take advantage of information not generally available.
                                </dd>
                                <dd className={styles.content} >If any fixture is subject to conditions that may alter the length, structure or
                                    format of the fixture in any manner (e.g. rain), ADV markets may be suspended.
                                </dd>
                                <dd className={styles.content} >Batsman Runs - bets will stand if the batsman has faced one ball or is given out
                                    before first ball is faced. Score counts if batsman is Not-Out including if innings
                                    is declared. In case of rain, match abandoned etc. settled bets will be valid.
                                </dd>
                                <dd className={styles.content} >Runs at Fall of 1st Wicket – This market will be settled based on the total number
                                    of runs scored at the fall of the first wicket. At least one ball must be bowled, if
                                    no wickets fall bets will be void unless settlement is already determined.
                                </dd>
                                <dd className={styles.content} >Runs at Fall of Next Wicket - The score before the fall of the specified wicket
                                    determines the result of the market. If a team declares or reaches their target then
                                    the score at the conclusion of the innings will determine the settlement of the
                                    bets. Bets will be void should no more play take place following the intervention of
                                    rain, or any other delay, as the ability to reach previous quotes offered will have
                                    been removed. In case of rain, match abandoned etc. settled bets will be valid.
                                </dd>
                                <dd className={styles.content} >Over Total Runs – Bets will be settled on the total number of runs scored during the
                                    1st over of the match. The over must be completed for bets to stand unless
                                    settlement is already determined.
                                </dd>
                                <dd className={styles.content} >In the instance that a market is not suspended upon the completion of the market,
                                    all bets placed after the time of completion may be made void.
                                </dd>
                                <dd className={styles.content} >ADV Opening Batsmen markets are only valid if the batsmen selected in the market
                                    opens the batting. If the opening batsmen change, then the opening batsmen market in
                                    relation to the particular player who was changed will be made void.
                                </dd>
                                <dd className={styles.content} >Extras and penalty runs will be included for settlement purposes with the exception
                                    of penalty runs awarded due to a slow over rate which will be excluded
                                </dd>
                            </ul>
                            <h5>Format Specific Session Runs Rules</h5>
                            <h6>Test Matches</h6>
                            <ul>
                                <dd className={styles.content} >Test Matches (Meter Paari) - All bets, open or closed, on a team’s innings runs
                                    shall be void if 70 full overs are not bowled unless one team has won, is dismissed
                                    or declares prior to that point.
                                </dd>
                                <dd className={styles.content} >ADV markets for both teams will be valid in test matches, regardless of which team
                                    bats first.
                                </dd>
                                <dd className={styles.content} >Where a session is open for a nominated number of overs but the team declare before
                                    the end of that session, the session is made complete by the remaining number of
                                    balls from the opposing team’s innings that follows the declaration.
                                </dd>
                                <dd className={styles.content} >Day 1, session 1, a minimum of 25 overs must be bowled, otherwise all bets in this
                                    session market will be void.
                                </dd>
                                <dd className={styles.content} >Day 1, session 2, a minimum of 25 overs must be bowled, otherwise all bets in this
                                    session market will be void.
                                </dd>
                                <dd className={styles.content} >1st Day Total Run markets will only be valid if a minimum of 80 overs are bowled on
                                    this day. Otherwise all bets in this market will be void.
                                </dd>
                                <dd className={styles.content} >Test Matches - (PLAYERS METER) Individual Batsmen Runs / Partnerships - All bets,
                                    open or closed, on an individual batsman or partnership runs shall be void if 50
                                    full overs are not bowled unless one team has won, is dismissed or declares prior to
                                    that point. Bets on partnership totals make up when the next wicket falls. If a
                                    batsman in the relevant partnership retires hurt, the partnership is treated as
                                    continuing between the remaining batsman and the batsman who comes to the wicket. A
                                    partnership is also treated as being ended by the end of an innings.
                                </dd>
                                <dd className={styles.content} >Total Match Four, Total Match Sixes, Total Match Runs, Total Match Wides, Total
                                    Match Extras, Total Match Wicket, Top Batsmen, Highest Over, Innings Designated Line
                                    Markets will only be valid if the third innings is played. Otherwise, all bets will
                                    be void.
                                </dd>
                                <dd className={styles.content} >Next Batsman Out markets - if a player retires injured, bets will be void in this
                                    market.
                                </dd>
                            </ul>
                            <h6>Limited Overs Matches</h6>
                            <ul>
                                <dd className={styles.content} >Limited Overs Matches - <b>(Player Meter)</b>, Individual Batsmen Runs or
                                    Partnerships - In a limited overs match where bets may be made on an individual
                                    batsman or partnership runs in-play and the innings is curtailed or subject to any
                                    reduction in overs, then these markets will be settled at the midpoint of the last
                                    available quote before the overs were reduced. If the innings resumes at a later
                                    time, a new market may be formed. If a customer wants a position in the new market
                                    they are required to place a new bet. If there are any subsequent reductions in
                                    overs, exactly the same rules will continue to apply i.e. the market is settled at
                                    the midpoint of the last available quote before the overs were reduced and a new
                                    market may be formed.
                                </dd>
                                <dd className={styles.content} >Total Match Four,Total Match Sixes, Total Match Runs, Total Match Wides, Total Match
                                    Extras, Total Match Wicket, Top Batsmen, Highest Over, Innings Designated Line
                                    Markets will only be valid if the second innings is played. Otherwise, all bets will
                                    be void.
                                </dd>
                                <dd className={styles.content} >In the event of an inning length being altered due to rain, match abandonment or any
                                    other condition, markets already settled will remain settled and all bets will
                                    remain valid. Bets in markets that are yet to be determined will be void.
                                </dd>
                            </ul>
                            <dt className={styles.title}>Exchange Runs</dt>
                            <ul>
                                <dd className={styles.content} >Bets are placed in an exchange and matched with corresponding bets.</dd>
                                <dd className={styles.content} >Bets will be matched at the requested run line or better.</dd>
                                <dd className={styles.content} >All exchange runs are based on decimal odds format.</dd>
                                <dd className={styles.content} >All bets are placed at 2.00 odds.</dd>
                                <dd className={styles.content} >
                                    Bets will be void in the following cases, regardless of whether the outcome of the
                                    bet is already unconditionally determined:
                                    <ol>
                                        <dd className={styles.content} >if the scheduled number of overs for the innings is reduced by rain
                                            interruption and at settlement time, the actual number of overs bowled is
                                            less than the number of overs stipulated for the market; or
                                        </dd>
                                        <dd className={styles.content} >if the scheduled number of overs for the innings is reduced for any other
                                            reason after the innings has begun, and at settlement time, the reduced
                                            number of scheduled overs is less than the number of overs stipulated for
                                            the market.
                                        </dd>
                                    </ol>
                                </dd>
                                <dd className={styles.content} >Please note that if the batting side reach their target within the total amount of
                                    stipulated overs or have been bowled out and the innings hasn’t been reduced in
                                    overs to less than the stipulated number of overs for the market, the market will be
                                    settled as complete.
                                </dd>
                            </ul>
                            <dt className={styles.title}>Genie Bet Markets</dt>
                            <ol>
                                <dd className={styles.content} >
                                    <b>General Twenty20 Cricket Betting Rules</b>
                                    <ol className="mt-0">
                                        <dd className={styles.content} >Genie Bets placed on Twenty20 Cricket are not inclusive of any ‘Super Over’.
                                            Bets are settled on the maximum allotted overs per team (20).
                                        </dd>
                                        <dd className={styles.content} >Any reference to ‘bet’ refers to the entire contents of a Genie Bet betslip.
                                            Any reference to a ‘selection’ is in reference to one selection within the
                                            related bet. Genie Bet is the aggregate bet compromised of all constituent
                                            selections.
                                        </dd>
                                        <dd className={styles.content} >If a player in the bet does not take any part in the match, then the whole
                                            bet will be made void, regardless of the rest of the selections within the
                                            bet. If the player takes to the pitch, then all player related bets will be
                                            settled accordingly as win/loss. ‘Player A to get 1+ Six’ would be a losing
                                            selection if he participates in fielding but does not bat. ‘Player B to get
                                            1+ Wicket’ would be a losing selection if he takes any part in the match
                                            regardless of whether he bowls. This ruling refers to any player related
                                            markets. Please refer to section 2 (Bet Type Settlement Rules) for player
                                            related market breakdowns and rulings.
                                        </dd>
                                        <dd className={styles.content} >Any void selection within your bet, will deem the entire bet void.</dd>
                                        <dd className={styles.content} >If all the selections within the bet are valid (all players involved within
                                            the bet take part within the match), any losing selection within the bet
                                            will deem the entire bet a losing bet. A winning slip must be comprised of
                                            winning selections only.
                                        </dd>
                                        <dd className={styles.content} >For any obvious pricing errors, we reserve the right to cancel/void any bets
                                            placed at that wrong price. We also reserve the right to cancel/void any
                                            bets on events where the venue is changed after the publication of odds.
                                        </dd>
                                        <dd className={styles.content} >In the event of a batsman retiring for any reason, all relevant batting
                                            markets for this batsman will be settled on the runs at the time of their
                                            retirement.
                                        </dd>
                                        <dd className={styles.content} >Any markets ending in ‘dead heats’ will be deemed as losers. For example, if
                                            you are to bet Player A ‘Top bat for his team’ and both him and Player B are
                                            top run scorers on the joint number of runs for their team– this would
                                            constitute a loser.
                                        </dd>
                                        <dd className={styles.content} >All ‘Team Runs’ markets will stand independent of the toss result. For
                                            example, ‘Over 150 Team A Runs’ is resulted even when Team B bat first and
                                            achieve 140 runs.
                                        </dd>
                                        <dd className={styles.content} >All markets will be settled on the result of the match on the day that it is
                                            played and completed. Any results that are changed retrospectively will not
                                            alter the settlement of the market.
                                        </dd>
                                        <dd className={styles.content} >If a match is postponed before the scheduled start and is subsequently
                                            rescheduled to be played less than 24 hours (inclusive) from the originally
                                            allotted start time, all bets will stay active and will be settled upon the
                                            result of the rescheduled match. If a match is postponed before the original
                                            start date/time and is subsequently rescheduled to be played more than 24
                                            hours from the original start time, all bets will be voided.
                                        </dd>
                                        <dd className={styles.content} >Any match where the start date/time has been altered well in advance (e.g.
                                            to ease fixture congestion) will not be classed as postponed.
                                        </dd>
                                        <dd className={styles.content} >For matches played at a neutral venue, all bets will still count regardless
                                            of the order the teams are listed and whether we have indicated it is as
                                            being played at a neutral venue (except in the situation of an obvious
                                            pricing error, please refer to 1.5).
                                        </dd>
                                        <dd className={styles.content} >In the event of a batsman retiring for any reason, all relevant batting
                                            markets for this batsman will be settled on the runs at the time of their
                                            retirement.
                                        </dd>
                                    </ol>
                                </dd>
                                <dd className={styles.content} >
                                    <b>Bet Type Rules</b>
                                    <ol className="mt-0 mb-0">
                                        <dd className={styles.content} ><b>Who will win?</b> – You are betting on the result, e.g. Team A, Draw or
                                            Team B…
                                        </dd>
                                        <dd className={styles.content} ><b>Who will score 10+/20+ runs?</b> – You are betting that a nominated
                                            player will score 10+/20+ runs.
                                        </dd>
                                        <dd className={styles.content} ><b>Who will be top bat?</b> – You are betting on who will be the top batsman
                                            in the match. As stated in 1.6, any dead heats will be classed as a losing
                                            selection.
                                        </dd>
                                        <dd className={styles.content} ><b>Who will be top bat for their team?</b> – You are betting on who will be
                                            the top batsman for their respective team. As stated in 1.6, any dead heats
                                            will be classed as a losing selection.
                                        </dd>
                                        <dd className={styles.content} ><b>Who will take a wicket?</b> – You are betting on a player to take a
                                            wicket. A run out will not be classified as a wicket for the player who ran
                                            the batsman out. A ‘Mankad’ runout whereby the bowler runs out the
                                            non-striking batsman will not count as a wicket for the bowler.
                                        </dd>
                                        <dd className={styles.content} ><b>Who will hit a six?</b> – You are betting on a nominated player to hit a
                                            six when batting. This must be signalled as six runs to the relevant player
                                            by the umpire and subsequently logged on any official scorecard as such.
                                            Running the six runs will not count as a six regarding this market.
                                        </dd>
                                        <dd className={styles.content} ><b>Who will hit a four?</b> – You are betting on a nominated player to hit a
                                            four when batting. This must be signalled as four runs to the relevant
                                            player by the umpire and subsequently logged on any official scorecard as
                                            such. Running the four runs will not count as a four regarding this market.
                                        </dd>
                                        <dd className={styles.content} ><b>How many runs will a player score?</b> – You are betting on a nominated
                                            player to score an amount of runs in their innings. If the player does not
                                            achieve the number of runs nominated, regardless of whether the player
                                            batted in the match then this selection would be a loser.
                                        </dd>
                                        <dd className={styles.content} ><b>How many sixes will a player hit?</b> – You are betting on a nominated
                                            player to hit a nominated number of sixes when batting. Each six must be
                                            signalled as six runs to the relevant player by the umpire and subsequently
                                            logged on any official scorecard as such. Running the six runs will not
                                            count as a six regarding this market.
                                        </dd>
                                        <dd className={styles.content} ><b>How many fours will a player hit?</b> – You are betting on a nominated
                                            player to hit a nominated number of fours when batting. Each four must be
                                            signalled as four runs to the relevant player by the umpire and subsequently
                                            logged on any official scorecard as such. Running the six runs will not
                                            count as a six regarding this market.
                                        </dd>
                                        <dd className={styles.content} ><b>How many wickets will a player take?</b> – You are betting on whether a
                                            player will take the nominated number of wickets specified.
                                        </dd>
                                        <dd className={styles.content} ><b>Which team will get the highest opening partnership?</b> – You are
                                            betting on which team will get the highest opening partnership score. This
                                            is the team who have the most runs at the point of the first wicket being
                                            taken.
                                        </dd>
                                        <dd className={styles.content} ><b>Which team will hit the most fours?</b> – You are betting on which team
                                            will hit the most fours in the match.
                                        </dd>
                                        <dd className={styles.content} ><b>Which team will hit the most sixes?</b> – You are betting on which team
                                            will hit the most sixes in the match.
                                        </dd>
                                        <dd className={styles.content} >
                                            <b>How many team stats?</b> – You are betting on a nominated number of the
                                            following events for your team:
                                            <ol className="mt-0 mb-0">
                                                <dd className={styles.content} >Sixes</dd>
                                                <dd className={styles.content} >Catches</dd>
                                                <dd className={styles.content} >Wickets</dd>
                                            </ol>
                                        </dd>
                                        <dd className={styles.content} >
                                            <b>Which team will get the most?</b> – You are betting on which team will
                                            get most of the following market-sets:
                                            <ol className="mt-0 mb-0">
                                                <dd className={styles.content} >Catches</dd>
                                                <dd className={styles.content} >Wickets</dd>
                                                <dd className={styles.content} >Run outs</dd>
                                            </ol>
                                        </dd>
                                        <dd className={styles.content} ><b>How many runs?</b> – You are betting on the total amount of runs in the
                                            match achieved by both teams combined.
                                        </dd>
                                        <dd className={styles.content} >
                                            <b>How many match stats?</b> – You are betting on a nominated number of the
                                            following events in the match:
                                            <ol className="mt-0 mb-0">
                                                <dd className={styles.content} >Sixes</dd>
                                                <dd className={styles.content} >Catches</dd>
                                                <dd className={styles.content} >Wickets</dd>
                                            </ol>
                                        </dd>
                                        <dd className={styles.content} ><b>What will the winning margin be?</b> – You are betting on what the
                                            winning margin will be for each team. In the event of a reduced overs match,
                                            this market will be settled based on the official result based on <b>Rain
                                                Rulings</b>.
                                        </dd>
                                        <dd className={styles.content} ><b>How will the first wicket fall?</b> – You are betting on the method by
                                            which the first wicket of the match will fall.
                                        </dd>
                                        <dd className={styles.content} >
                                            <b>What else will happen?</b> – You are betting on the following markets:
                                            <ol className="mt-0 mb-0">
                                                <dd className={styles.content} ><b>Super over</b> - A super over, also known as a one-over
                                                    eliminator, to be played in the match.
                                                </dd>
                                                <dd className={styles.content} ><b>50 scored in the match</b> – A player to achieve a score of 50 or
                                                    more in the match.
                                                </dd>
                                                <dd className={styles.content} ><b>Century scored in the match</b> – A player to achieve a score of
                                                    100 or more in the match.
                                                </dd>
                                                <dd className={styles.content} ><b>Hat-trick taken in the match</b> – A bowler to take a ‘hat-trick’
                                                    in the match. A hat-trick is when a bowler successfully dismisses
                                                    three batsmen with consecutive deliveries. The deliveries may be
                                                    interrupted by an over bowled by another bowler from the other end
                                                    of the pitch but must be three consecutive deliveries by the
                                                    individual bowler.
                                                </dd>
                                                <dd className={styles.content} ><b>Wicket taken in the 1st over</b> – A wicket to be taken by the
                                                    bowling team in the 1st over of the match.
                                                </dd>
                                            </ol>
                                        </dd>
                                    </ol>
                                </dd>
                            </ol>
                            <dt className={styles.title}>2. Football</dt>
                            <ul>
                                <dd className={styles.content} >If the Site does not suspend a market on time for the occurrence of a Material
                                    Event, the Site reserves the right to void bets unfairly matched after the Material
                                    Event has occurred. Voiding of these bets may take place during the event or
                                    retrospectively once a game is completed.
                                </dd>
                                <dd className={styles.content} >If a match has not started (or if the Site believes that a match will not have
                                    started) by 23:59 (local time) on its scheduled start date, then all bets will be
                                    void unless the Site has knowledge that the match has been rescheduled to be played
                                    within three days of its original start date
                                </dd>
                                <dd className={styles.content} >If a match starts but is later abandoned or postponed and the Site believes that the
                                    match will not have been completed by 23:59 (local time) on its scheduled start
                                    date, then all markets, with the exception of any unconditionally determined
                                    markets, will be void unless the Site has knowledge that the match has been
                                    rescheduled to be played within three days of its original start date. If the Site
                                    does have knowledge that the game will be played within three days and the game is
                                    played within three days, then all bets will stand except if the match is restarted
                                    from the beginning. If the match is restarted from the beginning then all bets
                                    matched before the market went in-play will stand, but any bets placed in-play will
                                    be void, except for any bets placed in-play on markets which have been
                                    unconditionally determined, which will stand.
                                </dd>
                                <dd className={styles.content} >For Friendly matches, all bets apply to the full duration of play according to the
                                    match officials, plus any stoppage time. If a friendly match starts but is later
                                    abandoned or postponed and is not completed (i.e. the full duration of play
                                    according to match officials, plus any stoppage time) within three days of the
                                    scheduled start date, all bets will be void except for those on markets which have
                                    been unconditionally determined. In the case of ambiguity over the official result
                                    from match officials, the outcome will be determined by the Site (acting reasonably)
                                    using information from independent sources.
                                </dd>
                                <dd className={styles.content} >Match odds bets apply to the full duration of play according to the match officials,
                                    plus any stoppage time. They do not include any result given after Extra Time or
                                    Penalties.
                                </dd>
                                <dd className={styles.content} >If an official fixture lists different team details to those listed on the Site (for
                                    example, the team name, reserves, age group, gender, etc), then all bets matched on
                                    the affected markets will be void. In all other cases, bets will stand (including
                                    instances where a team name is listed without specifying the term 'XI' in the name).
                                    If an official fixture is shown on the Site under an incorrect competition name,
                                    then the Site reserves the right to void all bets matched on the affected markets.
                                </dd>
                                <dd className={styles.content} >
                                    If a team is disqualified, thrown out or otherwise removed from a league, one of the
                                    following will apply:
                                    <ul className="mt-0 mb-0">
                                        <dd className={styles.content} >If this happens before the relevant season has started, all bets on all
                                            affected markets will be void (except for those on markets which have been
                                            unconditionally determined);
                                        </dd>
                                        <dd className={styles.content} >If this happens after relevant season has started, all affected markets will
                                            stand and the team will be deemed to be relegated and all bets on that team
                                            will be settled accordingly in all relevant markets (assuming, of course,
                                            that it is not subsequently reinstated before the end of the season).
                                        </dd>
                                    </ul>
                                </dd>
                                <dd className={styles.content} >The relevant season will be deemed to have started once the first league game has
                                    been played. For the purposes of this rule, markets relating to individual matches
                                    will not be deemed to be "affected markets".
                                </dd>
                                <dd className={styles.content} >For 'top goalscorer' markets only the goals scored in the league or competition
                                    stated in the Market Information count. For example, if a player joins a club
                                    mid-season any goals scored in a different league will not count, however goals
                                    scored for a different club in the same league will count. Own goals will not count.
                                </dd>
                                <dd className={styles.content} >In markets which relate to the number of incidents to occur, such as 'number of
                                    corners', these will be determined on the basis of the number taken, rather than
                                    awarded.
                                </dd>
                                <dd className={styles.content} >For markets that relate to the number of bookings given, the number of corners
                                    taken, any goalscorer or the time of a particular goal, the result will be
                                    determined by the Site (acting reasonably) using information from independent
                                    sources. In such cases, if any new information comes into the public domain within
                                    48 hours of settlement, then the Site shall (acting reasonably) determine either:
                                    (i) whether the market should be reinstated or resettled in light of this new
                                    information; or (ii) to wait for further information before deciding whether to
                                    reinstate or resettle the market. Except where the Site has announced that it is
                                    waiting for further information, any information that comes into the public domain
                                    more than 48 hours after a market has been settled shall not be considered by the
                                    Site (regardless of whether or not such information may have led to a different
                                    result).
                                </dd>
                            </ul>
                        </div>
                    </dl>
                </div>
            </div>
        </div>
    )
};

export default RulesRegulationsPage;