export const orgName = 'TAMU Datathon';

export const htmlContentPlaceholder = `<html>
    <body>
    <div
        style="max-width:800px; background-color: #18125b; z-index: -1; position: absolute; top: 0; left: 0; padding: 20px">

        <div style="font-family: Questrial, sans-serif;
            background: #fff;
            box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.1);
            border-radius: 3px;
            padding: 20px 50px !important;
            max-width: 500px;
            display: block;
            margin: 20px auto;">
            <h2 style="margin-bottom: 20px; font-size: 16px; color: black">Howdy former participants!</h2>

            <p style="line-height: 20px; -webkit-font-smoothing: antialiased;
            font-weight: normal;
            color: black;
            margin-bottom: 20px;">
                Thank you for joining us for TAMU Datathon 2020!
                To signup for TD 2021, please confirm your email by clicking the confirm button.
            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                    <td align="center">
                        <div style="margin: 3em 0em;">
                            <a style="padding: 1em 2em;
                                        background-color: #4740af; 
                                        border-radius: 5px;
                                        text-decoration: none;
                                        font-weight: bold;
                                        color: white;" target="_blank" href="<%= locals.confirmationLink %>">
                                Confirm Account
                            </a>
                        </div>
                    </td>
                </tr>
            </table>
            
            </p>

            <h3 style=" margin-bottom: 5px;
                font-size: 16px;
                line-height: 30px;
                -webkit-font-smoothing: antialiased;
                font-weight: normal;">
                Thanks!
            </h3>

            <strong style=" color: #18125b;
                font-size: 16px;">
                The TAMU Datathon Team
            </strong>

        </div>
    </div>
    </body>
</html>`;

export const mailingLists = [
  {
    name: 'Participants',
    address: 'mail_participants@td.com'
  },
  {
    name: 'Former Participants',
    address: 'mail_former_participants@td.com'
  },
  {
    name: 'Sponsors',
    address: 'mail_sponsors@td.com'
  },
  {
    name: 'Mentors',
    address: 'mail_mentors@td.com'
  },
  {
    name: 'Just for testing',
    address: 'test_account@tamudatathon.com'
  }
];
