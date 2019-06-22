<? 
// mb_internal_encoding("UTF-8");
// ini_set('error_reporting', E_ALL);
// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
use PHPMailer\PHPMailer\PHPMailer;
require_once('phpmailer/PHPMailerAutoload.php');
if ($_SERVER["REQUEST_METHOD"] == "POST") {

	if ($_SERVER["REQUEST_METHOD"] == "POST") {
		if (isset($_POST['userName']) ) {
			if(empty($_POST['userName'])) {
				echo 'notName';
				die;
			} else {
				$name = "<b>Имя: </b>" . strip_tags($_POST['userName']) . "<br>";
			}
		}
		if (isset($_POST['userTel']) ) {
			if(empty($_POST['userTel'])) {
				echo 'notTel';
				die;
			} else {
				$tel = "<b>Телефон: </b>" . strip_tags($_POST['userTel']) . "<br>";
			}
		}

		$productArr=[];
		$counter = 0;
		$body;
		$bodyHeader = '<table border="0" cellpadding="0" cellspacing="0" style="border-bottom:1px; border-right:1px; border-color:#e2e2e2; border-style: solid; width:800px" width="800" align="center">
			<tr >
				<th colspan="3" style="width: 400px; padding-top:15px; padding-bottom:15px; padding-right:15px; padding-left:15px; text-align:center; border-top:1px; border-left:1px; border-right:0; border-bottom:0; border-color:#e2e2e2; border-style: solid;">' . $name . '</th>
				<th colspan="4" style="width: 400px; padding-top:15px; padding-bottom:15px; padding-right:15px; padding-left:15px; text-align:center; border-top:1px; border-left:1px; border-right:0; border-bottom:0; border-color:#e2e2e2; border-style: solid;">' . $tel . '</th>
			</tr>';

		foreach ($_POST as $key =>  $value) {
			$body.= '<tr>';
			if (is_array($value) || $value instanceof Traversable) {
				foreach ($value as $k => $v) {

					if($k == 'productImg'){
						$productImg = '<img src="' . $v . '" width="100" height="100" alt="картинка товара">';
						$body.=
							'
											<td style="width: 100px; padding-top:15px; padding-bottom:15px; padding-right:15px; padding-left:15px; text-align:center; border-top:1px; border-left:1px; border-right:0; border-bottom:0; border-color:#e2e2e2; border-style: solid;" >
											<div style="padding: 5px;">
											'
												. $productImg .
											'
											</div></td>';
					}
					if($k == 'productName'){
						$body.=
							'<td style="width: 300px;  padding-top:15px; padding-bottom:15px; padding-right:15px; padding-left:15px; text-align:center; border-top:1px; border-left:1px; border-right:0; border-bottom:0; border-color:#e2e2e2; border-style: solid;" >
											<div style="padding: 5px;">
											'
							. $v .
							'
											</div></td>';
					}
					if($k == 'productSize'){
						if(!empty($v)){
							$body.=
								'<td style="width: 100px;  padding-top:15px; padding-bottom:15px; padding-right:15px; padding-left:15px; text-align:center; border-top:1px; border-left:1px; border-right:0; border-bottom:0; border-color:#e2e2e2; border-style: solid;" >
											<div style="padding: 5px;"> Размер: 
											'
								. $v .
								'
											</div></td>';
						} else {
							$body.=
								'<td style="width: 100px;  padding-top:15px; padding-bottom:15px; padding-right:15px; padding-left:15px; text-align:center; border-top:1px; border-left:1px; border-right:0; border-bottom:0; border-color:#e2e2e2; border-style: solid;" >
									<div style="padding: 5px;"> Размер отстутствует </div>
								</td>';
						}
					}
					if($k == 'productId'){
						$body.=
							'<td style="width: 100px;  padding-top:15px; padding-bottom:15px; padding-right:15px; padding-left:15px; text-align:center; border-top:1px; border-left:1px; border-right:0; border-bottom:0; border-color:#e2e2e2; border-style: solid;" >
												<div style="padding: 5px;"> ID: 
												'
							. $v .
							'
												</div></td>';
					}
					if($k == 'productPrice'){
						$body.=
							'<td style="width: 100px;  padding-top:15px; padding-bottom:15px; padding-right:15px; padding-left:15px; text-align:center; border-top:1px; border-left:1px; border-right:0; border-bottom:0; border-color:#e2e2e2; border-style: solid;" >
												<div style="padding: 5px;"> Цена: 
												'
							. $v .
							'
												</div></td>';
					}
					if($k == 'productQuantity'){
						$body.=
							'<td style="width: 100px;  padding-top:15px; padding-bottom:15px; padding-right:15px; padding-left:15px; text-align:center; border-top:1px; border-left:1px; border-right:0; border-bottom:0; border-color:#e2e2e2; border-style: solid;" >
												<div style="padding: 5px;"> Кол-во: 
												'
							. $v .
							'
												</div></td>';
					}

					if($k == 'productPriceCommon'){
						$body.=
							'<td style="width: 100px;  padding-top:15px; padding-bottom:15px; padding-right:15px; padding-left:15px; text-align:center; border-top:1px; border-left:1px; border-right:0; border-bottom:0; border-color:#e2e2e2; border-style: solid;" >
												<div style="padding: 5px;"> Общая цена:
												'
							. $v .
							'
												</div></td>';
					}

				}

				$body.= '</tr>';
			}
		};
		$bodybottom = '</table>';

$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

//$mail->SMTPDebug = 3;                               // Enable verbose debug output

$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'smtp.mail.ru';  																							// Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'spacepizza_zayvka@mail.ru'; // Ваш логин от почты с которой будут отправляться письма
$mail->Password = 'ljcnfdrfdctv'; // Ваш пароль от почты с которой будут отправляться письма
$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 465; // TCP port to connect to / этот порт может отличаться у других провайдеров

$mail->setFrom('spacepizza_zayvka@mail.ru'); // от кого будет уходить письмо?
$mail->addAddress('cemga91@gmail.com');     // Кому будет уходить письмо 
//$mail->addAddress('ellen@example.com');               // Name is optional
//$mail->addReplyTo('info@example.com', 'Information');
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');
//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = 'Заявка с тестового сайта';
$mail->Body    = '' .$name . ' оставил заявку, его телефон ' .$phone. '<br>Почта этого пользователя: ' .$email;
$mail->AltBody = '';

if(!$mail->send()) {
    echo 'Error';
} else {
    header('location: thank-you.html');
}