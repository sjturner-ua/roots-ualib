<?php $fields = get_fields(); ?>
<?php $jumboHeadBg = isset($fields['header_image']['url']) ? $fields['header_image']['url'] : false; ?>

<div class="jumbotron-header" <?php if ($jumboHeadBg !== false) print 'style="background-image: url('.$jumboHeadBg.');"'; ?>>
    <div class="jumbotron drewtest">
        <div class="container">

                  <?php if(function_exists('bcn_display'))
                  {
                    $display = bcn_display(true);
                    //$display = '<ol class="breadcrumb">' . $display . '</ol>';
                    print($display);
                  }?>

            <?php print $fields['header_content']; ?>
        </div>
    </div>
</div>
