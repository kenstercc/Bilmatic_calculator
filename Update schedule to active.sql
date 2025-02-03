Update billing_contract
                          SET contract_status ='a',
                              contract_update_timestamp = current_timestamp                          
                    WHERE contract_key_value_1='company01' AND
                          contract_key_value_2='office01' AND 
                          contract_key_value_3= '0' AND
                          contract_billing_item='jocan' 